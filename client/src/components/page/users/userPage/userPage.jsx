import React, { useEffect} from "react";
import PropTypes from "prop-types";
import UserCard from "../../../ui/userCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserById } from "../../../../store/users";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));
    const navigate = useNavigate();
   
    useEffect(() => {
        if(!user) {
            alert("Пользователя с таким ID не существует")
            navigate("/home")
        }
    }, [user])
 

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
