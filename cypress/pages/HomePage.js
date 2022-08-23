class HomePage{

    elements = {
        //Location: Blank Factor home page > menu > sliding pagination (01   02  03  04).
        homeElement:() => cy.get('.hero-slider__pagination'),
        //Location: Blank Factor home page > menu options.
        menu:()=>cy.get('#menu-main-menu'),
        //Location: Blank Factor home page > menu > Insights option.
        menuInsights: () => cy.get('.insights-mega-menu-wrap'),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section
        blogLink: () => cy.get('.insights-pages > a > p').eq(0),
        //Location: Open Blank Factor page > Accept cookies button.
        acceptCookiesBtn:() => cy.get('div#hs-eu-cookie-confirmation-inner #hs-eu-confirmation-button'),
    };

    //This method is to check cookies on page load. If the cookie message exists, it will accept all cookies.. 
    verifyCookies(){
        cy.isElementExist(cy.get('div#hs-eu-cookie-confirmation-inner > p#hs-eu-cookie-disclaimer')).then(() => {
            cy.log('Accepting Cookies.');
            this.elements.acceptCookiesBtn().click({force:true});
        });
    };

    
    //This method is to check if the home page loads correctly.
    validateHomePage(){
        cy.log('Validating home title.');
        this.elements.homeElement().should('be.visible');
        this.elements.menu().should('be.visible');
    };

    
    //This method do mouse over to the insights top link and It will click on Blog option.
    openBlogSection(){
        cy.log('Open the “Blog” section');
        this.elements.menuInsights().trigger('mouseover');
        this.elements.blogLink().should('be.visible').trigger('mouseover').click({force:true});
    };

};
module.exports = new HomePage();