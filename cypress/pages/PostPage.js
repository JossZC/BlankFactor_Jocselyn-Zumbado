class PostPage {

    elements = {
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > Why Fintech in Latin America Is Having a Boom post > post title.
        postTitle:() => cy.get('h1[class*="post-title"]'),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > Why Fintech in Latin America Is Having a Boom post > By.
        createdBy:() => cy.get('.author-name > a'),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > Why Fintech in Latin America Is Having a Boom post > post image.
        postImg:()=> cy.get('.post-thumbnail > img'),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > Why Fintech in Latin America Is Having a Boom post > post category.
        postCategory:() => cy.get('.post-page-template__header .categories-list > a').eq(1),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > Why Fintech in Latin America Is Having a Boom post > Subscribe to newsletter title.
        subscribeTitle:() =>cy.get('.sidebar-inner h3[class="heading-4 widget-newsletter__title"]'),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > Why Fintech in Latin America Is Having a Boom post > Subscribe button.
        subscribeBtn:() => cy.get('.sidebar-inner #form-newsletter-blog-submit-btn'),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > Why Fintech in Latin America Is Having a Boom post > Subscribe input.
        subscribeTxt:() => cy.get('.sidebar-inner .form-newsletter__fields input[type="email"]'),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > Why Fintech in Latin America Is Having a Boom post > Subscribe confirmation message after subscribe process.
        subscribeConfirmationMsg:() => cy.get('.sidebar-inner .mc4wp-response'),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > Why Fintech in Latin America Is Having a Boom post > Subscribe error message after using invalid email.
        invalidEmailErrorMsg:() => cy.get('.sidebar-inner .form-newsletter__fields span[class="error-message"]')
    };

    //This method is to check items or elements on subscribe part.
    checkSubscribePart(){
        this.elements.subscribeTitle().should('be.visible');
        this.elements.subscribeTxt().should('be.visible');
        this.elements.subscribeBtn().should('be.visible');

    }
    /**
    * This method will type an email and subscribe on the newsletter. 
    * @param {string} email the string value to enter into the input. 
    */ 
    subscribeOnNewsletter(email) {        
        this.elements.subscribeTxt().clear({ force: true }).type(email);
        this.elements.subscribeBtn().click();
        cy.wait(1000);
    }
}

module.exports = new PostPage();