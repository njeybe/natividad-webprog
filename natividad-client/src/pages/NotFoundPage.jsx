import React from "react";

function NotFoundPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md shadow-2xl sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 rounded-4xl">
          <h1 className="text-3xl font-bold mb-2">Page Not Found.</h1>
          <p className="text-zinc-600">
            Please make sure you clicked the right link!
          </p>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
