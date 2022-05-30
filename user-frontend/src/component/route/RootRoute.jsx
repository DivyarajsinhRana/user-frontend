import { Route, Routes } from "react-router-dom"
import AddUser from "../../pages/user/adduser/AddUser"
import EditUser from "../../pages/user/edituser/Edituser"
import Userdetail from "../../pages/user/Userdetail"

const RootRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Userdetail />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/edituser" element={<EditUser />} />
        </Routes>
    )
}
export default RootRoute