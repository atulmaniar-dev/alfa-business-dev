import Image from 'next/image';

interface TestimonialProps {
  message: string;
  name: string;
  title: string;
  image: string;
  companyLogo: string;
}

export default function TestimonialCard({
  message,
  name,
  title,
  image,
  companyLogo,
}: TestimonialProps) {
  return (
    <div className="min-w-[85vw] max-w-[90vw] sm:min-w-[320px] sm:max-w-[360px] md:min-w-[360px] lg:min-w-[380px] flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8  transition hover:shadow-lg h-full flex flex-col justify-between mx-2">
      <p className="text-gray-700 text-base leading-relaxed mb-6 relative pl-6 before:content-['“'] before:absolute before:left-0 before:top-0 before:text-4xl before:text-gray-800">
        {message}
      </p>

      <div className="border-t border-gray-100 mt-auto pt-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="rounded-full border border-gray-300"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">{name}</p>
            <p className="text-xs text-gray-500">{title}</p>
          </div>
        </div>

        <div className="flex-shrink-0">
          {companyLogo && (
            <Image
              src={companyLogo}
              alt="Company Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}
