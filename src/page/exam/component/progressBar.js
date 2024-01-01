
export const ProgressBar = ({ progressPercentage }) => {
    return (
        <div className='h-1.5  w-[40%] bg-gray-300 rounded-md'>
            <div
                style={{ width: `${progressPercentage}%`}}
                className={` rounded-md h-full ${
                    progressPercentage < 50 ? 'bg-red-600 ' : ' bg-purple-800'}`}>
            </div>
            {/* <p className="text-[10px] lg:text-[14px] py-2 font-mono"></p> */}
        </div>
    );
};