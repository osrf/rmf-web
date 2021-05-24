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
import { FleetState } from '../models';
import { GetFleetsResponse } from '../models';
import { GetRobotsResponse } from '../models';
import { HTTPValidationError } from '../models';
/**
 * FleetsApi - axios parameter creator
 * @export
 */
export const FleetsApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * **Available in socket.io**
     * @summary Get Fleet State
     * @param {string} name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getFleetStateFleetsNameStateGet: async (
      name: string,
      options: any = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'name' is not null or undefined
      if (name === null || name === undefined) {
        throw new RequiredError(
          'name',
          'Required parameter name was null or undefined when calling getFleetStateFleetsNameStateGet.',
        );
      }
      const localVarPath = `/fleets/{name}/state`.replace(
        `{${'name'}}`,
        encodeURIComponent(String(name)),
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
     * @summary Get Fleets
     * @param {string} [fleet_name] comma separated list of fleet names
     * @param {number} [limit]
     * @param {number} [offset]
     * @param {string} [order_by] common separated list of fields to order by, prefix with &#x27;-&#x27; to sort descendingly.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getFleetsFleetsGet: async (
      fleet_name?: string,
      limit?: number,
      offset?: number,
      order_by?: string,
      options: any = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/fleets`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (fleet_name !== undefined) {
        localVarQueryParameter['fleet_name'] = fleet_name;
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit;
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset;
      }

      if (order_by !== undefined) {
        localVarQueryParameter['order_by'] = order_by;
      }

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
     * @summary Get Robot Health
     * @param {string} fleet
     * @param {string} robot
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRobotHealthFleetsFleetRobotHealthGet: async (
      fleet: string,
      robot: string,
      options: any = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'fleet' is not null or undefined
      if (fleet === null || fleet === undefined) {
        throw new RequiredError(
          'fleet',
          'Required parameter fleet was null or undefined when calling getRobotHealthFleetsFleetRobotHealthGet.',
        );
      }
      // verify required parameter 'robot' is not null or undefined
      if (robot === null || robot === undefined) {
        throw new RequiredError(
          'robot',
          'Required parameter robot was null or undefined when calling getRobotHealthFleetsFleetRobotHealthGet.',
        );
      }
      const localVarPath = `/fleets/{fleet}/{robot}/health`
        .replace(`{${'fleet'}}`, encodeURIComponent(String(fleet)))
        .replace(`{${'robot'}}`, encodeURIComponent(String(robot)));
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
     * @summary Get Robots
     * @param {string} [fleet_name] comma separated list of fleet names
     * @param {string} [robot_name] comma separated list of robot names
     * @param {number} [limit]
     * @param {number} [offset]
     * @param {string} [order_by] common separated list of fields to order by, prefix with &#x27;-&#x27; to sort descendingly.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRobotsFleetsRobotsGet: async (
      fleet_name?: string,
      robot_name?: string,
      limit?: number,
      offset?: number,
      order_by?: string,
      options: any = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/fleets/robots`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (fleet_name !== undefined) {
        localVarQueryParameter['fleet_name'] = fleet_name;
      }

      if (robot_name !== undefined) {
        localVarQueryParameter['robot_name'] = robot_name;
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit;
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset;
      }

      if (order_by !== undefined) {
        localVarQueryParameter['order_by'] = order_by;
      }

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
 * FleetsApi - functional programming interface
 * @export
 */
export const FleetsApiFp = function (configuration?: Configuration) {
  return {
    /**
     * **Available in socket.io**
     * @summary Get Fleet State
     * @param {string} name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getFleetStateFleetsNameStateGet(
      name: string,
      options?: any,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FleetState>> {
      const localVarAxiosArgs = await FleetsApiAxiosParamCreator(
        configuration,
      ).getFleetStateFleetsNameStateGet(name, options);
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
     * @summary Get Fleets
     * @param {string} [fleet_name] comma separated list of fleet names
     * @param {number} [limit]
     * @param {number} [offset]
     * @param {string} [order_by] common separated list of fields to order by, prefix with &#x27;-&#x27; to sort descendingly.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getFleetsFleetsGet(
      fleet_name?: string,
      limit?: number,
      offset?: number,
      order_by?: string,
      options?: any,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetFleetsResponse>> {
      const localVarAxiosArgs = await FleetsApiAxiosParamCreator(configuration).getFleetsFleetsGet(
        fleet_name,
        limit,
        offset,
        order_by,
        options,
      );
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
     * @summary Get Robot Health
     * @param {string} fleet
     * @param {string} robot
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getRobotHealthFleetsFleetRobotHealthGet(
      fleet: string,
      robot: string,
      options?: any,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BasicHealth>> {
      const localVarAxiosArgs = await FleetsApiAxiosParamCreator(
        configuration,
      ).getRobotHealthFleetsFleetRobotHealthGet(fleet, robot, options);
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
     * @summary Get Robots
     * @param {string} [fleet_name] comma separated list of fleet names
     * @param {string} [robot_name] comma separated list of robot names
     * @param {number} [limit]
     * @param {number} [offset]
     * @param {string} [order_by] common separated list of fields to order by, prefix with &#x27;-&#x27; to sort descendingly.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getRobotsFleetsRobotsGet(
      fleet_name?: string,
      robot_name?: string,
      limit?: number,
      offset?: number,
      order_by?: string,
      options?: any,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetRobotsResponse>> {
      const localVarAxiosArgs = await FleetsApiAxiosParamCreator(
        configuration,
      ).getRobotsFleetsRobotsGet(fleet_name, robot_name, limit, offset, order_by, options);
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
 * FleetsApi - factory interface
 * @export
 */
export const FleetsApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  return {
    /**
     * **Available in socket.io**
     * @summary Get Fleet State
     * @param {string} name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getFleetStateFleetsNameStateGet(name: string, options?: any): AxiosPromise<FleetState> {
      return FleetsApiFp(configuration)
        .getFleetStateFleetsNameStateGet(name, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Get Fleets
     * @param {string} [fleet_name] comma separated list of fleet names
     * @param {number} [limit]
     * @param {number} [offset]
     * @param {string} [order_by] common separated list of fields to order by, prefix with &#x27;-&#x27; to sort descendingly.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getFleetsFleetsGet(
      fleet_name?: string,
      limit?: number,
      offset?: number,
      order_by?: string,
      options?: any,
    ): AxiosPromise<GetFleetsResponse> {
      return FleetsApiFp(configuration)
        .getFleetsFleetsGet(fleet_name, limit, offset, order_by, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * **Available in socket.io**
     * @summary Get Robot Health
     * @param {string} fleet
     * @param {string} robot
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRobotHealthFleetsFleetRobotHealthGet(
      fleet: string,
      robot: string,
      options?: any,
    ): AxiosPromise<BasicHealth> {
      return FleetsApiFp(configuration)
        .getRobotHealthFleetsFleetRobotHealthGet(fleet, robot, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Get Robots
     * @param {string} [fleet_name] comma separated list of fleet names
     * @param {string} [robot_name] comma separated list of robot names
     * @param {number} [limit]
     * @param {number} [offset]
     * @param {string} [order_by] common separated list of fields to order by, prefix with &#x27;-&#x27; to sort descendingly.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRobotsFleetsRobotsGet(
      fleet_name?: string,
      robot_name?: string,
      limit?: number,
      offset?: number,
      order_by?: string,
      options?: any,
    ): AxiosPromise<GetRobotsResponse> {
      return FleetsApiFp(configuration)
        .getRobotsFleetsRobotsGet(fleet_name, robot_name, limit, offset, order_by, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * FleetsApi - object-oriented interface
 * @export
 * @class FleetsApi
 * @extends {BaseAPI}
 */
export class FleetsApi extends BaseAPI {
  /**
   * **Available in socket.io**
   * @summary Get Fleet State
   * @param {string} name
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof FleetsApi
   */
  public getFleetStateFleetsNameStateGet(name: string, options?: any) {
    return FleetsApiFp(this.configuration)
      .getFleetStateFleetsNameStateGet(name, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Get Fleets
   * @param {string} [fleet_name] comma separated list of fleet names
   * @param {number} [limit]
   * @param {number} [offset]
   * @param {string} [order_by] common separated list of fields to order by, prefix with &#x27;-&#x27; to sort descendingly.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof FleetsApi
   */
  public getFleetsFleetsGet(
    fleet_name?: string,
    limit?: number,
    offset?: number,
    order_by?: string,
    options?: any,
  ) {
    return FleetsApiFp(this.configuration)
      .getFleetsFleetsGet(fleet_name, limit, offset, order_by, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * **Available in socket.io**
   * @summary Get Robot Health
   * @param {string} fleet
   * @param {string} robot
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof FleetsApi
   */
  public getRobotHealthFleetsFleetRobotHealthGet(fleet: string, robot: string, options?: any) {
    return FleetsApiFp(this.configuration)
      .getRobotHealthFleetsFleetRobotHealthGet(fleet, robot, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Get Robots
   * @param {string} [fleet_name] comma separated list of fleet names
   * @param {string} [robot_name] comma separated list of robot names
   * @param {number} [limit]
   * @param {number} [offset]
   * @param {string} [order_by] common separated list of fields to order by, prefix with &#x27;-&#x27; to sort descendingly.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof FleetsApi
   */
  public getRobotsFleetsRobotsGet(
    fleet_name?: string,
    robot_name?: string,
    limit?: number,
    offset?: number,
    order_by?: string,
    options?: any,
  ) {
    return FleetsApiFp(this.configuration)
      .getRobotsFleetsRobotsGet(fleet_name, robot_name, limit, offset, order_by, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
