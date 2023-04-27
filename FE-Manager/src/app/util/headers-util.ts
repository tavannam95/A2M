import { HttpHeaders } from "@angular/common/http";
import { Cookie } from "ng2-cookies";

const USER_TOKEN = 'user-token';

export class HeadersUtil{
    public static getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
        });
    }

    public static getHeadersAuth(): HttpHeaders {
        const token = Cookie.get(USER_TOKEN);
        if (token == undefined || token == null) {
            return HeadersUtil.getHeaders();
        }

        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
        });
    }
}