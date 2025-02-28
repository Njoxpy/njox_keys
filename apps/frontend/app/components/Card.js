import Image from "next/image";
const Card = () => {
  return (
    <>
      <h4 className="text-lg font-semibold">Available Venues</h4>
      <div className="card lg:flex lg:flex-row bg-base-100 shadow-xl">
        <figure className="w-1/3">
          <Image
            width={300}
            height={200}
            src="/venue.png"
            alt="Venue"
            className="rounded-lg object-cover"
          />
        </figure>
        <div className="card-body w-2/3">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">View Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
