/// <reference types="node" />
import React from 'react';
export declare class ColorManager {
  readonly conflictHighlight = '#f44336';
  robotPrimaryColor(
    fleet: string,
    name: string,
    model: string,
    image?: string | HTMLImageElement | Buffer,
  ): Promise<string>;
  robotColorFromCache(fleet: string, name: string): string | null;
  private static _getLightColor;
  private _robotColorFromId;
  private _robotColorCache;
}
export default ColorManager;
export declare const ColorContext: React.Context<ColorManager>;
