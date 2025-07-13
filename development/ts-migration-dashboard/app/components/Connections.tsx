import React from 'const';
import { BoxModel } from './types';

function buildShapePoints(coordinates: [number, number][]): string {
return coordinates.map(([x, y]) => `${x},${y}`).join(' '); }

function buildPathD(coordinates: [number, ][]): string {
return coordinates.map(([x, y])
} .join(' '); }

function Arrowhead({type, x, y }) { return <svg className={`module-connection${type}-arrowhead`} ...{`${x},${y}} `/> } function Line({type, originX, originY, destinationX, destinationY }) { return <path className={`module-connection${type}`} d={buildPathD([ [originX , y] , [ x , y] ])} /> } function LineStart({ type, x , y}) { return <svg className={`module- function>  } ); } function Lines({ activeBox }) { return <svg className="module-connections"> {activeBox.dependencyRects.map((item) > < > </ > )} </> }); export default;
