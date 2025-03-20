const Heading = (props) => {
    const heading = props?.title || 'Contract Management'
    return (
        <div className="bg-[#5f43b2]">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl dark:text-white font-bold">{heading}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Heading