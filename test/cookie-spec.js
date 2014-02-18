define(function(require) {
    var expect = require('expect');
    var Cookie = require('cookie');

    describe('Cookie', function() {
        describe('get', function() {
        });

        describe('set', function() {
        });

        describe('del', function() {
            it('删除cookie', function() {
                Cookie.set('_sea_test_21', 'xx');
                Cookie.remove('_sea_test_21');
                expect(Cookie.get('_sea_test_21')).to.equal(undefined);

                Cookie.set('_sea_test_22', 'xx', {
                    expires: new Date(2099, 1, 1),
                    path: '/'
                });
                Cookie.remove('_sea_test_22', {
                    path: '/'
                });
                expect(Cookie.get('_sea_test_22')).to.equal(undefined);
            });
        });
    });
});