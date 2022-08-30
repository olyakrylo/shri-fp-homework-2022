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

const isStarRed = compose(isRed, getStar);
const isSquareGreen = compose(isGreen, getSquare);
const isTriangleWhite = compose(isWhite, getTriangle);
const isCircleWhite = compose(isWhite, getCircle);
const isCircleBlue = compose(isBlue, getCircle);
const isSquareOrange = compose(isOrange, getSquare);
const isTriangleGreen = compose(isGreen, getTriangle);

const allNotWhite = compose(
  equals(0),
  count(isWhite),
);

const areTwoValuesSame = (values) => equals(...values);

const getRedAndBlueCounts = (values) => [count(isRed)(values), count(isBlue)(values)];

const getTriangleAndSquare = (event) => [getTriangle(event), getSquare(event)];

const hasColorCount = (colorSelector, count) => compose(
  lte(count),
  count(colorSelector),
  values,
)

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isStarRed, isSquareGreen, isTriangleWhite, isCircleWhite]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
  lte(2),
  count(isGreen),
  values
);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(
  areTwoValuesSame,
  getRedAndBlueCounts,
  values
);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  isCircleBlue,
  isStarRed,
  isSquareOrange
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
  isTriangleGreen,
  hasColorCount(isGreen, 2),
  hasColorCount(isRed, 1)
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
