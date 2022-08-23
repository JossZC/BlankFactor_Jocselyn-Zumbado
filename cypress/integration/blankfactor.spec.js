//Page objects
const HomePage = require('../pages/HomePage');
const BlogPage = require('../pages/BlogPage');
const PostPage = require('../pages/PostPage');

//Data
const Data = require('../fixtures/data.json');


describe("BlankFactor", function () {
    /**
    * Automated tests for BlankFactor.
    */
    beforeEach(() => {
        cy.log('Navigate to “http://blankfactor.com”');
        cy.visit(Data.baseurl);
        HomePage.verifyCookies();
        HomePage.validateHomePage();
        HomePage.openBlogSection();
        cy.log('Scroll down to “Why Fintech in Latin America Is Having a Boom” and click the post by Sofia Gonzalez');
        BlogPage.findPostOnBlogSection(Data.blogTitle);
    });

    describe("Check post items and continue with the process.", function (){
        it('Check post items.', () => {
            cy.log('Validate the URL.');
            cy.location().should((url) => {
                expect(url.pathname).to.equal(Data.blogURL, 'The current URL is not the same as the one expected in the data file.');
            });

            cy.log('Validate the Post Title.');
            PostPage.elements.postTitle().invoke('text').then((text) => {
                expect(text.trim()).to.equal(Data.blogTitle, 'The current post title is not the same as the one expected in the data file.');
            });

            cy.log('Validate the Author of the post.');
            PostPage.elements.createdBy().invoke('text').then((text) => {
                expect(text.trim()).to.equal(Data.by, 'The current author of the post is not the same as expected in the data file.');
            });

            cy.log('Validate the Post image.');
            PostPage.elements.postImg().invoke('attr', 'src').then((image) => {
                expect(image.trim()).to.equal(Data.postImage, 'The current image of the post is not the same as expected in the data file.');
            });
            
            cy.log('Validate the Post category.');
            PostPage.elements.postCategory().invoke('text').then((text) => {
                expect(text.trim()).to.equal(Data.postCategory, 'The current category of the post is not the same as expected in the data file.');
            });
        });
        
         //This test will subscribe to the newsletter using the subscribe form.
        it('Subscribe to newsletter', () => {
            cy.log('Validate Subscribe to newsletter items.');
            PostPage.checkSubscribePart();
            cy.log('Validate the error message when using an invalid email');
            PostPage.subscribeOnNewsletter(Data.invalidEmailTest);
            PostPage.elements.invalidEmailErrorMsg().invoke('text').then((text) => {
                expect(text.trim()).to.equal(Data.invalidEmailErrorMessage, 'The subscribe error message is not the same as expected in the data file.')
            });
            cy.log('Validate the confirmation message when using a valid email');
            PostPage.subscribeOnNewsletter(Data.emailTest);
            PostPage.elements.subscribeConfirmationMsg().should('be.visible').invoke('text').then((text) => {
                expect(text.trim()).to.equal(Data.subscribeConfirmationMessage, 'The current subscribe confirmation message is not the same as expected in the data file.')
            });
        });

        //Go back to the blog section and print a list of all post titles with related links.
        it('Go to blog section, print all posts and links', () => {
            HomePage.openBlogSection();
            BlogPage.printAllPosts();
        });
    });
});