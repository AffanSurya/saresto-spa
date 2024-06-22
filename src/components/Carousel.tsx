import { Carousel } from "flowbite-react";

export default function CarouselComponent() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel pauseOnHover>
        <img
          src="https://lh3.googleusercontent.com/p/AF1QipPU073O109fLck8Z15IqezWZjugC4CN1Q7VJ8Pp=s1360-w1360-h1020"
          alt="..."
        />
        <img
          src="https://lh3.googleusercontent.com/p/AF1QipM2wLrOatRHPWcO5m4yPjvnetYXKufasCSKh4HJ=s1360-w1360-h1020"
          alt="..."
        />
        <img
          src="https://lh3.googleusercontent.com/p/AF1QipNHWt0vXpyzafT6EbY7enBhUws_t4DDclDtiNcQ=s1360-w1360-h1020"
          alt="..."
        />
        <img
          src="https://lh3.googleusercontent.com/p/AF1QipNHEwVnHFcNIeO2gGqyTipbvVO00Z71lh0qOO9g=s1360-w1360-h1020"
          alt="..."
        />
        <img
          src="https://lh3.googleusercontent.com/p/AF1QipO6tU1OUvrm1jTjurmn0XexyPZ-x1E5MT0JXS3v=s1360-w1360-h1020"
          alt="..."
        />
        <img
          src="https://lh3.googleusercontent.com/p/AF1QipPA-IOiQ3E_A1D6j9uATAPdxtPAKCD7OSnbRW3P=s1360-w1360-h1020"
          alt="..."
        />
      </Carousel>
    </div>
  );
}
