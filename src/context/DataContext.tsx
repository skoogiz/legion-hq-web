import * as React from "react";
import {To, useNavigate} from "react-router-dom";
import Axios from "axios";
import {AlertTitle, Alert, Snackbar} from "@mui/material";
// import ErrorFallback from '@legion-hq/common/ErrorFallback';
import {urls} from "@legion-hq/constants";
import {useAuth0} from "@auth0/auth0-react";
import auth from "@legion-hq/constants/auth";
import {RouterLink, useRoutes} from "@legion-hq/routes";
import {noop} from "lodash";
import {ListTemplate} from "@legion-hq/types";
const {returnTo} = auth.prod;

type DataContextValue = {
  auth?: Record<string, unknown>;
  faction?: string;
  isDrawerOpen: boolean;
  userId?: string;
  routes: Record<string, RouterLink>;
  userLists: Array<ListTemplate>;
  goToPage: (newRoute: To) => void;
  fetchUserLists: (userId: string) => void;
  setUserLists: (userLists: Array<ListTemplate>) => void;
  setIsDrawerOpen: (open: boolean) => void;
  deleteUserList: (listId: string) => void;
  isLoginDisabled: boolean;
  loginTooltipText: string;
  loginButtonText: string;
  loginHandler: () => void;
};

const DEFAULT_VALUE: DataContextValue = {
  isDrawerOpen: false,
  routes: {},
  userLists: [],
  goToPage: noop,
  fetchUserLists: noop,
  setUserLists: noop,
  setIsDrawerOpen: noop,
  deleteUserList: noop,
  isLoginDisabled: true,
  loginTooltipText: "",
  loginButtonText: "Login",
  loginHandler: noop,
};

const DataContext = React.createContext<DataContextValue>(DEFAULT_VALUE);
const httpClient = Axios.create();
httpClient.defaults.timeout = 10000;

type Props = {
  enableLogin?: boolean;
  children: React.ReactNode;
};

export function DataProvider({enableLogin, children}: Props) {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false);
  const [isAlertAllowed, setIsAlertAllowed] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | Error | undefined>();
  const [userId, setUserId] = React.useState<string | undefined>();
  const [message, setMessage] = React.useState<string | undefined>();
  const [userLists, setUserLists] = React.useState<Array<ListTemplate>>([]);

  const {routes} = useRoutes();

  const {user, loginWithRedirect, logout, isAuthenticated} = useAuth0();
  let isLoginDisabled = true;
  let loginTooltipText = "";
  let loginButtonText = "Loading...";
  let loginHandler = noop;

  if (enableLogin)
    if (!isAuthenticated) {
      isLoginDisabled = false;
      loginButtonText = "Login";
      loginTooltipText = "Login via Google, Facebook, or use a custom account.";
      loginHandler = () => loginWithRedirect();
    } else {
      isLoginDisabled = false;
      loginButtonText = "Logout";
      loginTooltipText = `Logged in as ${user?.email}`;
      loginHandler = () => logout({returnTo});
    }

  React.useEffect(() => {
    if (user && user.email && isAuthenticated && !userId) {
      fetchUserId(user.email);
    }
  }, [isAuthenticated, user, userId]);

  React.useEffect(() => {
    if (userId) fetchUserLists(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  React.useEffect(() => {
    let numFetches = 0;
    const intervalId = setInterval(() => {
      if (userId && numFetches < 5) {
        numFetches++;
        fetchUserLists(userId);
      } else if (user && isAuthenticated && !userId) {
        fetchUserId(user.email ? user.email : "Undefined email");
      }
    }, 15000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, user, isAuthenticated]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const goToPage = React.useCallback((newRoute: To) => navigate(newRoute), []);

  const fetchUserLists = React.useCallback((userId: string) => {
    if (userId) {
      httpClient
        .get(`${urls.api}/lists?userId=${userId}`)
        .then((response) => {
          setUserLists(response.data);
        })
        .catch((e: Error) => {
          setError(e);
          setMessage(`Failed to fetch lists for user ${userId}.`);
          setIsAlertOpen(true);
        });
    } else setUserLists([]);
  }, []);

  const deleteUserList = React.useCallback(
    (listId: string) => {
      if (userId && listId) {
        httpClient
          .delete(`${urls.api}/lists/${listId}`)
          .then(() => fetchUserLists(userId))
          .catch((e: Error) => {
            setError(e);
            setMessage(`Failed to delete list ${listId} for user ${userId}.`);
            setIsAlertOpen(true);
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId],
  );

  const fetchUserId = (email: string) => {
    if (email) {
      httpClient
        .get(`${urls.api}/users?email=${email}`)
        .then((response) => {
          if (response.data.length > 0) {
            setUserId(response.data[0].userId);
          } else {
            httpClient
              .post(`${urls.api}/users`, {email})
              .then((creationResponse) => {
                if (creationResponse.data.length > 0) {
                  setUserId(response.data[0].userId);
                } else {
                  setError("Login failure");
                  setMessage(
                    `Tried and failed to create account with email address ${email}.`,
                  );
                  setIsAlertOpen(true);
                }
              })
              .catch(() => {
                setError("Login failure");
                setMessage(`Failed to create account with email address ${email}.`);
                setIsAlertOpen(true);
              });
          }
        })
        .catch((e: Error) => {
          console.error(e);
          setError(e);
          setMessage(`Can't find user with email address ${email}. Server likely down.`);
          setIsAlertOpen(true);
        });
    }
  };
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setIsAlertAllowed(false);
  };

  // if (error) return <ErrorFallback error={error} message={message} />;

  const value = React.useMemo(
    () => ({
      auth,
      isDrawerOpen,
      userId,
      routes,
      userLists,
      goToPage,
      fetchUserLists,
      setUserLists,
      setIsDrawerOpen,
      deleteUserList,
      isLoginDisabled,
      loginTooltipText,
      loginButtonText,
      loginHandler,
    }),
    [
      isDrawerOpen,
      userId,
      userLists,
      goToPage,
      fetchUserLists,
      setUserLists,
      setIsDrawerOpen,
      deleteUserList,
      isLoginDisabled,
      loginTooltipText,
      loginButtonText,
      loginHandler,
      routes,
    ],
  );

  return (
    <React.Fragment>
      <DataContext.Provider value={value}>{children}</DataContext.Provider>
      <Snackbar
        open={isAlertOpen && isAlertAllowed}
        autoHideDuration={null}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          <AlertTitle>Something went wrong!</AlertTitle>
          <strong>{error && error.toString()}</strong>
          <br />
          {message}
          <br />
          Issues can be emailed to{" "}
          <a href="mailto:contact@legion-hq.com">contact@legion-hq.com</a>.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default DataContext;
