describe('Routes Users', () => {
    const User = app.datasource.models.user;
    const defaultUser = {
        id: 1,
        firstName: 'admin',
        lastName: 'password',
        dbPassword: 'jd3k'
    };

    beforeEach(done => {

        User
        .destroy({where: {}})
        .then(() => {
            User.create(defaultUser)
        })
        .then(() => {
            done();
        })
    })

    describe('Route GET /users', () => {
        it('shoul return a list of users', done => {
            request
            .get('/users')
            .end((err, res) => {
                expect(res.body.result[0].id).to.be.eql(defaultUser.id);
                expect(res.body.result[0].firstName).to.be.eql(defaultUser.firstName);
                expect(res.body.result[0].lastName).to.be.eql(defaultUser.lastName);
                expect(res.body.result[0].dbPassword).to.be.eql(defaultUser.dbPassword);                

                done(err);
            })
        })
    })
})