export default function TestimonialSkeleton() {
  return (
    <div className="min-w-[85vw] max-w-[90vw] sm:min-w-[320px] sm:max-w-[360px] md:min-w-[360px] lg:min-w-[380px] flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-md animate-pulse flex flex-col justify-between mx-2">
      <div className="relative pl-6 mb-6">
        <div className="absolute left-0 top-0 text-4xl text-gray-300 font-serif select-none">“</div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-10/12" />
          <div className="h-4 bg-gray-200 rounded w-9/12" />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5 mt-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 border border-gray-300" />
          <div>
            <div className="h-4 bg-gray-300 rounded w-24 mb-1" />
            <div className="h-3 bg-gray-300 rounded w-16" />
          </div>
        </div>

        <div className="w-9 h-9 bg-gray-300 rounded object-contain" />
      </div>
    </div>
  );
}
