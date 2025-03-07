Here’s how you can integrate `ioredis` into your **announcement controller** to cache and optimize the responses.

---

### **1. Install ioredis**

If you haven’t installed it yet, run:

```bash
npm install ioredis
```

---

### **2. Create Redis Client**

Create a new file **redisClient.js** to manage the Redis connection:

```javascript
const Redis = require("ioredis");

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000), // Retry on failure
});

redis.on("connect", () => console.log("Connected to Redis"));
redis.on("error", (err) => console.error("Redis Error:", err));

module.exports = redis;
```

---

### **3. Integrate Redis in Announcement Controller**

Modify your `announcementController.js` to include Redis caching.

#### **Updated Code with Redis Caching**

```javascript
const Announcement = require("../models/announcementModel");
const { OK, NOT_FOUND, SERVER_ERROR } = require("../constants/responseCode");
const redis = require("../config/redisClient"); // Import Redis

// get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const cacheKey = "announcements";
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log("Serving from cache");
      return res.status(OK).json(JSON.parse(cachedData));
    }

    const announcements = await Announcement.find({}).sort({ createdAt: -1 });

    if (announcements.length === 0) {
      return res.json({ message: "No announcements for now" });
    }

    // Cache the announcements for 1 hour (3600 seconds)
    await redis.set(cacheKey, JSON.stringify(announcements), "EX", 3600);

    res.status(OK).json(announcements);
  } catch (error) {
    res
      .status(NOT_FOUND)
      .json({ message: "failed to fetch announcements", error: error.message });
  }
};

// get announcement by id
const getAnnouncementById = async (req, res) => {
  const { id } = req.params;

  try {
    const cacheKey = `announcement:${id}`;
    const cachedAnnouncement = await redis.get(cacheKey);

    if (cachedAnnouncement) {
      console.log("Serving from cache");
      return res.status(OK).json(JSON.parse(cachedAnnouncement));
    }

    const announcement = await Announcement.findOne({ _id: id });

    if (!announcement) {
      return res.status(NOT_FOUND).json({ message: "Announcement not found" });
    }

    // Cache announcement for 1 hour
    await redis.set(cacheKey, JSON.stringify(announcement), "EX", 3600);

    res.status(OK).json(announcement);
  } catch (error) {
    res
      .status(NOT_FOUND)
      .json({ message: "failed to fetch announcement", error: error.message });
  }
};

// create announcement
const createAnnouncement = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.json({ message: "fill all required fields" });
  }

  if (title.length < 40 || title.length > 60) {
    return res.status(400).json({
      message: "title length should be between 40 and 60 characters",
    });
  }

  if (body.length < 300 || body.length > 3000) {
    return res.status(400).json({
      message: "body length should be between 300 and 3000 characters",
    });
  }

  try {
    const announcement = await Announcement.create({ title, body });

    // Invalidate (delete) the cache to fetch fresh data
    await redis.del("announcements");

    res.status(OK).json(announcement);
  } catch (error) {
    res
      .status(NOT_FOUND)
      .json({ message: "failed to add announcement", error: error.message });
  }
};

// update announcement by id
const updateAnnouncementBydId = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAnnouncement = await Announcement.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!updatedAnnouncement) {
      return res.status(NOT_FOUND).json({ message: "announcement not found" });
    }

    // Update the cached version
    await redis.set(
      `announcement:${id}`,
      JSON.stringify(updatedAnnouncement),
      "EX",
      3600
    );

    // Invalidate announcements list cache
    await redis.del("announcements");

    res.status(OK).json({ message: "update successfully", updatedAnnouncement });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "failed to update announcement", error: error.message });
  }
};

// delete announcement by id
const deleteAnnouncementById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAnnouncement = await Announcement.findOneAndDelete({
      _id: id,
    });

    if (!deletedAnnouncement) {
      return res.status(NOT_FOUND).json({ message: "not found" });
    }

    // Remove from cache
    await redis.del(`announcement:${id}`);
    await redis.del("announcements");

    res.status(OK).json({
      message: "announcement deleted successfully",
      deletedAnnouncement,
    });
  } catch (error) {
    res
      .status(NOT_FOUND)
      .json({ message: "failed to delete announcement", error: error.message });
  }
};

module.exports = {
  getAllAnnouncements,
  createAnnouncement,
  getAnnouncementById,
  updateAnnouncementBydId,
  deleteAnnouncementById,
};
```

---

### **How This Works**

1. **Caching Announcements List (`getAllAnnouncements`)**
   - Tries to fetch from Redis first.
   - If no cache is found, fetches from MongoDB and stores the result in Redis for **1 hour**.

2. **Caching Individual Announcements (`getAnnouncementById`)**
   - Stores each announcement in Redis with the key `announcement:{id}`.
   - If requested again, serves from Redis instead of MongoDB.

3. **Invalidating Cache on Changes**
   - When a new announcement is **created**, updated, or deleted, we **delete** the cached list (`announcements`) to ensure fresh data.
   - When an announcement is **updated**, its individual cache (`announcement:{id}`) is also updated.
   - When an announcement is **deleted**, its individual cache is also removed.

---

### **Benefits**

✅ **Faster API Responses** – Redis serves cached data instantly instead of querying MongoDB.  
✅ **Reduces Database Load** – Fewer queries to MongoDB improve performance.  
✅ **Ensures Data Consistency** – Cache is automatically updated when announcements change.  

---

### **Next Steps**

- If you're using Docker, consider running Redis in a container.
- You can also **use Redis for real-time notifications** with **Pub/Sub**.
- Add **rate limiting** to prevent abuse of API calls.

---

This setup makes your API **blazing fast** 🚀. Let me know if you need any tweaks!
