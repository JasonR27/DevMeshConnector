import { React, ReactNode } from "react"
import MainNavigation from "./MainNavigation"
import '../styles/RootLayout.css'; // Import the CSS file

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
    <div className="navContainer">
      <MainNavigation />
      <main>{children}</main>
      </div>
    </>
  )
}

export default RootLayout