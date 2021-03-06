/* tslint:disable */
/* eslint-disable */
/**
 * RMF API Server
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { BasicHealth } from '../models';
import { Dispenser } from '../models';
import { DispenserState } from '../models';
import { HTTPValidationError } from '../models';
/**
 * DispensersApi - axios parameter creator
 * @export
 */
export const DispensersApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * **Available in socket.io**
     * @summary Get Dispenser Health
     * @param {string} guid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDispenserHealthDispensersGuidHealthGet: async (
      guid: string,
      options: any = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'guid' is not null or undefined
      if (guid === null || guid === undefined) {
        throw new RequiredError(
          'guid',
          'Required parameter guid was null or undefined when calling getDispenserHealthDispensersGuidHealthGet.',
        );
      }
      const localVarPath = `/dispensers/{guid}/health`.replace(
        `{${'guid'}}`,
        encodeURIComponent(String(guid)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        query.set(key, options.query[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * **Available in socket.io**
     * @summary Get Dispenser State
     * @param {string} guid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDispenserStateDispensersGuidStateGet: async (
      guid: string,
      options: any = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'guid' is not null or undefined
      if (guid === null || guid === undefined) {
        throw new RequiredError(
          'guid',
          'Required parameter guid was null or undefined when calling getDispenserStateDispensersGuidStateGet.',
        );
      }
      const localVarPath = `/dispensers/{guid}/state`.replace(
        `{${'guid'}}`,
        encodeURIComponent(String(guid)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        query.set(key, options.query[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Get Dispensers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDispensersDispensersGet: async (options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/dispensers`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        query.set(key, options.query[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * DispensersApi - functional programming interface
 * @export
 */
export const DispensersApiFp = function (configuration?: Configuration) {
  return {
    /**
     * **Available in socket.io**
     * @summary Get Dispenser Health
     * @param {string} guid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getDispenserHealthDispensersGuidHealthGet(
      guid: string,
      options?: any,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BasicHealth>> {
      const localVarAxiosArgs = await DispensersApiAxiosParamCreator(
        configuration,
      ).getDispenserHealthDispensersGuidHealthGet(guid, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * **Available in socket.io**
     * @summary Get Dispenser State
     * @param {string} guid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getDispenserStateDispensersGuidStateGet(
      guid: string,
      options?: any,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DispenserState>> {
      const localVarAxiosArgs = await DispensersApiAxiosParamCreator(
        configuration,
      ).getDispenserStateDispensersGuidStateGet(guid, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @summary Get Dispensers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getDispensersDispensersGet(
      options?: any,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Dispenser>>> {
      const localVarAxiosArgs = await DispensersApiAxiosParamCreator(
        configuration,
      ).getDispensersDispensersGet(options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * DispensersApi - factory interface
 * @export
 */
export const DispensersApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  return {
    /**
     * **Available in socket.io**
     * @summary Get Dispenser Health
     * @param {string} guid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDispenserHealthDispensersGuidHealthGet(
      guid: string,
      options?: any,
    ): AxiosPromise<BasicHealth> {
      return DispensersApiFp(configuration)
        .getDispenserHealthDispensersGuidHealthGet(guid, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * **Available in socket.io**
     * @summary Get Dispenser State
     * @param {string} guid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDispenserStateDispensersGuidStateGet(
      guid: string,
      options?: any,
    ): AxiosPromise<DispenserState> {
      return DispensersApiFp(configuration)
        .getDispenserStateDispensersGuidStateGet(guid, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Get Dispensers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDispensersDispensersGet(options?: any): AxiosPromise<Array<Dispenser>> {
      return DispensersApiFp(configuration)
        .getDispensersDispensersGet(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * DispensersApi - object-oriented interface
 * @export
 * @class DispensersApi
 * @extends {BaseAPI}
 */
export class DispensersApi extends BaseAPI {
  /**
   * **Available in socket.io**
   * @summary Get Dispenser Health
   * @param {string} guid
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DispensersApi
   */
  public getDispenserHealthDispensersGuidHealthGet(guid: string, options?: any) {
    return DispensersApiFp(this.configuration)
      .getDispenserHealthDispensersGuidHealthGet(guid, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * **Available in socket.io**
   * @summary Get Dispenser State
   * @param {string} guid
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DispensersApi
   */
  public getDispenserStateDispensersGuidStateGet(guid: string, options?: any) {
    return DispensersApiFp(this.configuration)
      .getDispenserStateDispensersGuidStateGet(guid, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Get Dispensers
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DispensersApi
   */
  public getDispensersDispensersGet(options?: any) {
    return DispensersApiFp(this.configuration)
      .getDispensersDispensersGet(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
