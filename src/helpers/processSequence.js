/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
 import Api from '../tools/api';
 import {
   allPass,
   compose,
   ifElse,
   length,
   partial,
   tap,
   test,
   startsWith,
   prop,
   andThen,
   assoc,
   __,
   mathMod,
   concat,
   otherwise,
   complement,
   gte,
   lte
 } from "ramda";

 const doThen = (fn) => andThen(fn);

 const api = new Api();
 const API_URLS = {
   animals: 'https://animals.tech/',
   numbers: 'https://api.tech/numbers/base',
 };
 const parseResult = prop('result');

 const toBinaryNumber = compose(
   doThen(parseResult),
   api.get(API_URLS.numbers),
   assoc('number', __, { from: 10, to: 2 }),
 );

 const toAnimal = compose(
   doThen(parseResult),
   api.get(__, {}),
   concat(API_URLS.animals),
   String,
 );

 const isShorterThan10 = compose(lte(__, 10), length);
 const isLongerThan2 = compose(gte(__, 2), length);
 const isPositive =  complement(startsWith('-'));
 const isNumber = test(/^[0-9]+(\.[0-9]+)?$/);

 const validate = allPass([
   isLongerThan2,
   isShorterThan10,
   isPositive,
   isNumber
 ]);

 const toNumber = compose(Math.round, Number);
 const square = (n) => n ** 2;
 const getMod3 = mathMod(__, 3);

 const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
   const log = tap(writeLog);

   const processNumber = compose(
     otherwise(handleError),
     doThen(handleSuccess),
     doThen(toAnimal),
     doThen(log),
     doThen(getMod3),
     doThen(log),
     doThen(square),
     doThen(log),
     doThen(length),
     doThen(log),
     toBinaryNumber,
     log,
     toNumber,
   );

   const handleValidationError = partial(handleError, ['ValidationError']);
   const validateValue = ifElse(validate, processNumber, handleValidationError);

   compose(validateValue, log)(value);
 }

 export default processSequence;
