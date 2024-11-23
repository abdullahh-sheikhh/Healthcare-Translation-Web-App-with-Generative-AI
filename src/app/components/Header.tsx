const Header = () => {
    return (
        <div>
            <header className='relative sm:p-10 flex flex-col justify-center items-center text-center'>
                <h1 className='fixed top-0 w-full p-2 bg-black sm:bg-transparent sm:text-2xl font-semibold text-gray-200 sm:text-gray-700'>
                    Healthcare Translation Web App with Generative AI
                </h1>
                <p className='mt-16 w-full p-2 bg-gray-800 sm:bg-transparent text-sm sm:text-md font-light text-gray-300 sm:text-gray-800'>
                    This is a web app that uses generative AI to translate
                    healthcare data.
                </p>
            </header>
        </div>
    );
};

export default Header;
