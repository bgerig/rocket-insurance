const LoadingOverlay = () => {
    return (
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
            <span className="text-violet-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                <svg className="spinner" viewBox="0 0 50 50">
                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                </svg>
            </span>
        </div>
    );
};

export default LoadingOverlay;
