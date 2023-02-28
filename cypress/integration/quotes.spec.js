// write tests here
describe('Quotes App', () => {

    beforeEach(() => {
        // Each Test needs fresh state
        // Tests should not rely on others tests
        // Every test should work in isolation

        cy.visit('http://localhost:1234');
    })

    const textInput = () => cy.get('input[name=text]');
    const authorInput = () => cy.get('input[name=author]');
    const foobarInput = () => cy.get('input[name=foobar]');
    const submitBtn = () => cy.get("button[id='submitBtn']");
    const cancelBtn = () => cy.get("button[id='cancelBtn']");

    it('Sanity check to make sure tests work', () => {
        
        //"it" is a test
        //'expect" is an assertion
        //There can be multiple assertions per test, but they all need to relate to the thing we are testing
        
        
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.equal(5);
        expect({}).not.equal({});
        expect({}).to.eql({});
    })

    it('The proper elements are showing', () => {
        textInput().should('exist');
        authorInput().should('exist');
        foobarInput().should('not.exist');
        submitBtn().should('exist');
        cancelBtn().should('exist');

        cy.contains('Submit Quote').should('exist');
    })

    describe('Filling out the inputs and cancelling', () => {
        it('Can navigate to the site', () => {
            cy.url().should('include', 'localhost');
        })
        it('Submit button starts out disabled', () => {
            textInput()
                .should('have.value', '')
                .type('CSS rules')
                .should('have.value', 'CSS rules');

            authorInput()
                .should('have.value', '')
                .type('CRHarding')
                .should('have.value', 'CRHarding');
        })

        it('The submit button enables when both inputs are filled out', () => {
            authorInput().type('Casey');
            textInput().type('This is fun');
            submitBtn().should('not.be.disabled');
        })

        it('The cancel button can reset the inputs and disable the sumbit button', () => {
            authorInput().type('Annileise');
            textInput().type('I love smoothies');
            cancelBtn().click();
            textInput().should('have.value', '');
            authorInput().should('have.value', '');
            submitBtn().should('be.disabled');
        })
    })

    describe('Adding a new quote', () => {
        it('Can sumbit and delete a new quote', () => {
            textInput().type('CSS rules');
            authorInput().type('CRHarding');
            submitBtn().click();

            cy.contains('CSS rules').siblings('button:nth-of-type(2)').click();
            cy.contains('CSS rules').should('not.exist');
        })

        it('Variation of can submit a new quote', () => {
            cy.contains('CSS rules').should('not.exist');
            textInput().type('CSS rules');
            authorInput().type('Casey');
            submitBtn().click();

            cy.contains('CSS rules');
            cy.contains('Casey');
            cy.contains('CSS rules').next().next().click();
            cy.contains('CSS rules').should('not.exist');
        })
    })

    describe('Editing an existing quote', () => {
        it('can edit a quote', () => {
            textInput().type('Lorem ipsum');
            authorInput().type('CRHarding');
            submitBtn().click();

            cy.contains('Lorem ipsum').siblings('button:nth-of-type(1)').click();
            textInput().should('have.value', 'Lorem ipsum');
            authorInput().should('have.value', 'CRHarding');

            textInput().type(' dolor sit');
            authorInput().type(' ROCKS');
            submitBtn().click();

            cy.contains('Lorem ipsum dolor sit');
            cy.contains('CRHarding ROCKS');

            cy.contains('Lorem ipsum dolor sit').next().next().click();
            cy.contains('Lorem ipsum dolor sit').should('not.exist');
        })
    })


})