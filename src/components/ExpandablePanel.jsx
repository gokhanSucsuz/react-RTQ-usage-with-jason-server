/* eslint-disable react/prop-types */

import { useState } from "react"
import { GoChevronDown, GoChevronLeft } from "react-icons/go"


function ExpandablePanel({ header, children }) {
    const [expanded, setExpandend] = useState(false)

    const handleClick = () => {
        setExpandend(!expanded)
    }
    return (
        <div className="panelDiv">
            <div className="topArrangement">
                <div className="topArrangement">
                    {header}
                </div>
                <div onClick={handleClick}>
                    {expanded ? <GoChevronDown /> : <GoChevronLeft />}

                </div>
            </div>

            {
                expanded && <div>{children}</div>
            }
        </div>
    )
}

export default ExpandablePanel