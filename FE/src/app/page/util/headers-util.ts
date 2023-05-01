import { HttpHeaders } from "@angular/common/http";
import { Cookie } from "ng2-cookies";

export class HeadersUtil {
    public static getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
        });
    }

    public static getHeadersAuth(): HttpHeaders {
        const token = Cookie.get("token");
        if (token == undefined || token == null) {
            return HeadersUtil.getHeaders();
        }

        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
        });
    }
}
