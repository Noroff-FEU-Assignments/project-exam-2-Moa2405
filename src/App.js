import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthProvider } from "./context/authContext";
import Layout from './components/layout/mainLayout/MainLayout';
import Home from './pages/home/Home';
import MyProfile from "./pages/profile/MyProfile";
import UsersProfile from "./pages/profile/UsersProfile";
import User from './pages/profile/User';
import SignIn from './pages/signIn/SignIn';
import Register from './pages/register/Register';
import SinglePost from "./pages/post/SinglePost"
import SinglePostOutlet from './pages/post/SinglePostOutlet';
import SignInRegisterLayout from './components/layout/signInRegisterLayout/SignInRegisterLayout';
import { SnackBarProvider } from './context/snackBarContext';
import { PostsProvider } from './context/postContext';
import FourOFour from './pages/404/404';

const App = () => {

  return (
    <AuthProvider>
      <SnackBarProvider>
        <PostsProvider>
          <Routes>

            <Route element={<SignInRegisterLayout />}>
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='home' element={<Home />} />
              <Route path="user" element={<User />}>
                <Route path=":name" element={<UsersProfile />} />
                <Route path="myProfilePage" element={<MyProfile />} />
              </Route>

              <Route path="/post" element={<SinglePostOutlet />}>
                <Route path=":id" element={<SinglePost />} />
              </Route>

            </Route>
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </PostsProvider>
      </SnackBarProvider>
    </AuthProvider>
  );
}

App.propTypes = {
  children: PropTypes.node,
};


export default App;