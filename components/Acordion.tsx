const Acordion = (props: {
    headerText: string;
    children: React.ReactNode;
}) => {
    const {headerText, children} = props
    return <div className="bg-white  border rounded border-gray-400 ">
            <details className="rounded-lg">
                <summary className="font-semibold flex justify-between p-3">
                    <button className="button-secondary">Save</button>
                    <div>
                        {headerText}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"></path></svg>    
                    </div>
                    
                </summary>
                <div className="border-t border-gray-300">
                    {children}
                </div>
            </details>
        </div>
}
export default Acordion