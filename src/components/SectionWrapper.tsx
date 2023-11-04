import React from "react";

interface ISectionWrapper {
  children: React.ReactNode
}

function SectionWrapper({children}: ISectionWrapper) {
  return(
    <div className="my-4">{children}</div>
  )
}

export default SectionWrapper;