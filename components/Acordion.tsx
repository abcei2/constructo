const Acordion = (props: {
    headerText: string;
    children: React.ReactNode;
}) => {
    const {headerText, children} = props
    return <div className=" space-y-2 border rounded border-gray-400  ">
            <details className="rounded-lg">
            <summary className="font-semibold">{headerText}</summary>
                {children}
            </details>
        </div>
}
export default Acordion