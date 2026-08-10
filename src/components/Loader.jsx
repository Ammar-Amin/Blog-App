// The banter-loader markup lives in App.css. Kept here so the nine boxes
// aren't hand-copied into every page that needs a spinner.
export default function Loader() {
    return (
        <div className='w-full h-[400px] relative'>
            <div className='banter-loader'>
                {Array.from({ length: 9 }, (_, i) => (
                    <div key={i} className='banter-loader__box'></div>
                ))}
            </div>
        </div>
    )
}
