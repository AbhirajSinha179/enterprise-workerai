"use client";

const MaintenancePage = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center  p-4">
            <h1 className="text-4xl font-bold  mb-4">
                We're working on something!
            </h1>
            <p className="text-lg  mb-6">
                Please try again after some time.
            </p>
            <div className="flex items-center space-x-3">
                <svg
                    className="w-10 h-10  animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4zm2 5.292A7.962 7.962 0 014 12H2c0 2.21.895 4.21 2.344 5.656l1.656-1.364z"
                    ></path>
                </svg>
                <span className="text-sm ">We'll be back shortly.</span>
            </div>
        </div>
    );
};

export default MaintenancePage;
