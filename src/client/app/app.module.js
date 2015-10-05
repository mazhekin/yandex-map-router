(function() {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.auth',
        'app.shared',

        'app.mapper'
    ]);

})();

// ���� ��������� ECMA-262, 5-� �������, 15.4.4.19
// ������ (en): http://es5.github.com/#x15.4.4.19
// ������ (ru): http://es5.javascript.ru/x15.4.html#x15.4.4.19
if (!Array.prototype.map) {
    /* jshint -W121 */
    Array.prototype.map = function(callback, thisArg) {

        var T, A, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        // 1. ������� O ������ ���������� ������ ToObject � ��������� ���
        //    �������� |this| � �������� ���������.
        var O = Object(this);

        // 2. ������� lenValue ������ ���������� ������ ����������� ������ Get
        //    ������� O � ���������� "length".
        // 3. ������� len ������ ToUint32(lenValue).
        /*jslint bitwise: true */
        var len = O.length >>> 0;

        // 4. ���� ����� IsCallable(callback) ����� false, ���������� ���������� TypeError.
        // �������� (en): http://es5.github.com/#x9.11
        // �������� (ru): http://es5.javascript.ru/x9.html#x9.11
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. ���� thisArg ������������, ������� T ������ thisArg; ����� ������� T ������ undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. ������� A ������ ������ ������, ��� ���� �� �� ��� ������ ���������� new Array(len),
        //    ��� Array �������� ����������� ���������� ������������� � ���� ������,
        //    � len �������� ��������� len.
        A = new Array(len);

        // 7. ������� k ������ 0
        k = 0;

        // 8. ���� k < len, ����� ���������
        while (k < len) {

            var kValue, mappedValue;

            // a. ������� Pk ������ ToString(k).
            //   ��� ������� �������������� ��� �������������� �������� � ��������� in
            // b. ������� kPresent ������ ���������� ������ ����������� ������ HasProperty
            //    ������� O � ���������� Pk.
            //   ���� ��� ����� ���� �������� � ����� c
            // c. ���� kPresent ����� true, ��
            if (k in O) {

                // i. ������� kValue ������ ���������� ������ ����������� ������ Get
                //    ������� O � ���������� Pk.
                kValue = O[k];

                // ii. ������� mappedValue ������ ���������� ������ ����������� ������ Call
                //     ������� callback �� ��������� T � �������� �������� this � �������
                //     ����������, ���������� kValue, k � O.
                mappedValue = callback.call(T, kValue, k, O);

                // iii. ������� ���������� ����� DefineOwnProperty ������� A � �����������
                // Pk, ��������� ��������
                // { Value: mappedValue,
                //   Writable: true,
                //   Enumerable: true,
                //   Configurable: true }
                // � false.

                // � ���������, �������������� Object.defineProperty, ���������� ��������� ���:
                // Object.defineProperty(A, k, {
                //   value: mappedValue,
                //   writable: true,
                //   enumerable: true,
                //   configurable: true
                // });

                // ��� ������ ��������� ����������, ���������� ��������� ���:
                A[k] = mappedValue;
            }
            // d. �������� k �� 1.
            k++;
        }

        // 9. ����� A.
        return A;
    };
}

/* jshint -W121 */
Array.prototype.move = function (oldIndex, newIndex) {
    if (newIndex >= this.length) {
        var k = newIndex - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);
    return this; // for testing purposes
};