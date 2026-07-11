import { createRootRoute, Outlet } from "@tanstack/react-router";
import Card from "react-bootstrap/esm/Card";

function RootLayout() {
    return <Outlet />;
}

function Home() {
    return <>
    <div>
        <img className="heading-card w-full" src="/images/wire-box.webp" alt="" style={{ height: '40vh', objectFit: 'cover' }} />
        <div className="absolute left-0 right-0 p-6 text-white text-left" style={{ color: 'white', alignSelf: 'end', justifySelf: 'start' }}>
            <h1>Welcome to TCC Store</h1>
            <p>Try out our original, homemade designs!</p>
        </div>
    </div>
    <h2>We value quality and craftsmanship.</h2>
    <p>Each piece is carefully crafted to ensure the highest quality and attention to detail.</p>
    </>
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: Home,
});

export default Route;