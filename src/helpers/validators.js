/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
  allPass,
  anyPass,
  compose,
  equals,
  not,
  prop,
  values,
  lte,
  count
} from "ramda";

const isWhite = equals('white');
const isRed = equals('red');
const isGreen = equals('green');
const isBlue = equals('blue');
const isOrange = equals('orange');

const isNotWhite = compose(not, isWhite);
const isNotRed = compose(not, isRed);

const getStar = prop('star');
const getSquare = prop('square');
const getTriangle = prop('triangle');
const getCircle = prop('circle');

const allNotWhite = compose(
  equals(0),
  count(isWhite),
);

const areTwoValuesSame = (values) => equals(...values);

const getTriangleAndSquare = (event) => [getTriangle(event), getSquare(event)];

const countColor = (colorSelector) => compose(
  count(colorSelector),
  values,
);

const hasColorCount = (colorSelector, num) => compose(
  lte(num),
  countColor(colorSelector),
);

const exactColorCount = (colorSelector, num) => compose(
  equals(num),
  countColor(colorSelector)
);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  compose(isRed, getStar),
  compose(isGreen, getSquare),
  compose(isWhite, getTriangle),
  compose(isWhite, getCircle),
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
  lte(2),
  count(isGreen),
  values
);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (event) => equals(countColor(isRed)(event), countColor(isBlue)(event));

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  compose(isBlue, getCircle),
  compose(isRed, getStar),
  compose(isOrange, getTriangle),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
  hasColorCount(isRed, 3),
  hasColorCount(isBlue, 3),
  hasColorCount(isGreen, 3),
  hasColorCount(isOrange, 3)
]);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  compose(isGreen, getTriangle),
  exactColorCount(isGreen, 2),
  exactColorCount(isRed, 1)
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(
  equals(4),
  count(isOrange),
  values
)

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = compose(
  allPass([isNotRed, isNotWhite]),
  getStar
);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(
  equals(4),
  count(isGreen),
  values
);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = compose(
  allPass([allNotWhite, areTwoValuesSame]),
  getTriangleAndSquare
);
