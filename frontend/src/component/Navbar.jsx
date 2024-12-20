import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle } from '../components/ui/drawer';  // Use the correct imports

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex justify-between shadow-slate-400 p-5 h-16 bg-white text-black">
      <div>
        <Link to = "/">portfolio</Link>
      </div>

      <div className="md:flex gap-3 items-center md:flex-row hidden">
        <Link to="/About" className="hover:text-blue-500"><h1>About us</h1></Link>
        <Link to="/Design_Portfolio" className="hover:text-blue-500"><h1>Design your portfolio</h1></Link>
      </div>

      {/* Drawer Trigger for Small Devices */}
      <div className="md:hidden">
        <Drawer open={drawerOpen} className= "bg-black" onOpenChange={setDrawerOpen}>
          <DrawerTrigger>
            <button className="p-2 bg-gray-200 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
              </svg> 
            </button>
          </DrawerTrigger>

          <DrawerContent> {/* Drawer opens from the left to right */}
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter className="flex flex-col text-center gap-4 text-slate-300">
              <Link to="/About" onClick={() => setDrawerOpen(false)} className="hover:text-blue-500">
                <h1>About us</h1>
              </Link>
              <Link to="/Design_Portfolio" onClick={() => setDrawerOpen(false)} className="hover:text-blue-500">
                <h1>Design your portfolio</h1>
              </Link>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export default Navbar;
