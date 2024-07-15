interface ImportMeta {
    env: Env;
}

interface Env {
    PORT:                    number;
    IO_PORT:                 number;
    LOCAL_ADDRESS:           string;
    LOCAL_HOST:              string;
    IPV4_ADDRESS:            string;
    IPV4_HOST:               string;
    IO_HOST:                 string;
    ROUTER_BASE_PATH:        string;
    ROUTER_HOME_NAME:        string;
    ROUTER_HOME_PATH:        string;
    ROUTER_TODO_DETAIL_NAME: string;
    ROUTER_TODO_DETAIL_PATH: string;
    ROUTER_LOGIN_NAME:       string;
    ROUTER_LOGIN_PATH:       string;
    ROUTER_SIGN_UP_NAME:     string;
    ROUTER_SIGN_UP_PATH:     string;
    ROUTER_NOT_FOUND_NAME:   string;
    ROUTER_NOT_FOUND_PATH:   string;
    API_BASE_URL:            string;
    API_USER_LOGIN:          API;
    API_USER_GET:            API;
    API_TODO_GET_TODO_LIST:  API;
    API_TODO_GET_TODO:       API;
    VALIDATION_EMAIL:        string;
    VALIDATION_NAME:         string;
    STORE_USER_INFO_NAME:    string;
    STORE_STORAGE_INFO_NAME: string;
    STORE_TODO_INFO_NAME:    string;
}

interface API {
    key: string;
}
