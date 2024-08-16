/* eslint-disable no-unused-vars */
import React from "react"
import { Book, List } from "react-feather"

export function DesktopNav() {
	return (
		<nav className="desktop-nav">
			<button className="desktop-nav-icon">
				<Book size={32} />
			</button>
			<button className="desktop-nav-icon">
				<List size={32} />
			</button>
		</nav>
	)
}

export function MobileNav() {
	return (
		<nav className="mobile-nav">
			<button className="mobile-nav-icon">
				<Book size={32} />
			</button>
			<button className="mobile-nav-icon">
				<List size={32} />
			</button>
		</nav>
	)
}
