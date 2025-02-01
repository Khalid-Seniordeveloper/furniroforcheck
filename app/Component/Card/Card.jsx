import Image from 'next/image';

const Card = ({ src, title, description, price, cutprice }) => {
  return (
    <div className="w-[28.5rem] h-[44.6rem] card-main-container hover">
      <div className="flex justify-center w-[100% h-[70%]"> 
        <Image src={src} width={240} height={240} className="object-cover w-[100%] h-[100%]" />
      </div>
      <div className="detail-container w-[100%] p-[2rem]">
        <h1 className="text-[2.4rem]">{title}</h1>
        <h2 className="text-[1.6rem]">{description}</h2>
        <div className="flex price-card items-center justify-between mt-5">
          <h3 className="text-[2rem]">${price}</h3>
          <h2 className="text-[1.6rem]"><del>${cutprice}</del></h2>
        </div>
      </div>
    </div>
  )
}

export default Card;
