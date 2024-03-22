import type { AxiosError, AxiosInstance } from "axios";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { refreshThanck } from "../redux/auth/authThanck";

export default function useAxiosInterceptor(service: AxiosInstance): void {
    const dispatch = useAppDispatch();
    const {user, accessToken} = useAppSelector((store)=> store.auth);
    useEffect(() => {
        const requestInterceptor = service.interceptors.request.use(
          (config) => {
            if (!config.headers.Authorization) {
              config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
          },
          (err) => Promise.reject(err),
        );
    
        const responseInterceptor = service.interceptors.response.use(
          (res) => res,
          async (err: AxiosError & { config: { sent?: boolean } }) => {
            const prevRequest = err.config;
            if (err.response?.status === 403 && !prevRequest.sent) {
              prevRequest.sent = true;
              const newAuthState = await dispatch(refreshThanck()).unwrap();
              prevRequest.headers.Authorization = `Bearer ${newAuthState.accessToken}`;
              return service(prevRequest);
            }
            return Promise.reject(err);
          },
        );

    
        return () => {
          service.interceptors.request.eject(requestInterceptor);
          service.interceptors.response.eject(responseInterceptor);
        };
      }, [user]);
}