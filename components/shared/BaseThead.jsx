const BaseThead = ({ ths }) => {
    return (
        <thead className="text-xs  text-gray-700 uppercase bg-[#e4e1db]">
            <tr>
                {
                    ths.map(th => {
                        return (
                            <th key={th} scope="col" className={`px-6 py-3 ${(th === ths[ths.length - 1]) ? "text-center" : ""}`}>
                                {th}
                            </th>
                        )
                    })
                }
            </tr>
        </thead>
    )
}

export default BaseThead