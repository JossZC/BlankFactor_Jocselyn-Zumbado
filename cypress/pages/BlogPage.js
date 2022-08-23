class BlogPage {

    elements = {
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > trending post.
        trendingPosts:(title) => cy.get('section[class*="trending-posts section"]').find('h2[class="heading-4 post-title"] > a').contains(title),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > list of latest posts.
        blogList: () => cy.get('.blog-layout__list'),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > list of latest posts > list of blog titles.
        blogTitles: () => cy.get('.posts-list > article h2[class*="post-title"]'),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > list of latest posts > Load more button.
        loadMoreBtn: () => cy.get('.load-more-btn-wrap'),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > list of latest posts > Load more button > post count.
        totalOfPosts: () => cy.get('.load-more-btn-wrap > button'),
        //Location: Blank Factor home page > menu > Insights option > “Blog” section > list of latest posts > Load more button > results of the posts displayed.
        paginationResults: () => cy.get('.pagination-with-results > .results'),
    };

    /**
    * This method will find the post in the Trending Post part, if the post is not found, it will look for the post on Latest Posts.
    * @param {string} title the title value to find.
    */
    findPostOnBlogSection(title){
        cy.log('Finding the Post on Trending posts: ' + title);
        if(this.elements.trendingPosts(title).should('be.visible').scrollIntoView()){
            cy.log('The post is visible in trending posts');
            this.elements.trendingPosts(title).click({force:true});
        }else{
            cy.log('The post is not in Trending posts, look for the post in Latest posts');
            this.findAndOpenPostByTitle(title);
        };
    };

    /**
    * This method will find the index position of the title, if the post is not found, it will load more posts by clicking the "load more" button.
    * If it find it, it will click on post.
    * @param {string} title the title value to find.
    */
    findAndOpenPostByTitle(title) {
        cy.log('Finding the Post on Latest Posts: ' + title);
        this.getIndexOfthePost(title);
        cy.get('@indexPost').then((indexFound) => {
            if (indexFound === null) {
                this.clickLoadMoreButton();
                this.findAndOpenPostByTitle(title);
            } else {
                cy.log('Post Found in Position: ' + indexFound);
                cy.log('Clicking the Post');
                this.elements.blogTitles().eq(indexFound).click();
            };
        });
    };

    /**
    * This method will find the index position of the title, if the post is not found, it will return a null value.
    * @param {string} title is the title value to find
    */
    getIndexOfthePost(title) {
        cy.wrap(null).as('indexPost');
        this.elements.blogList().should('be.visible').then(() => {
            this.elements.blogTitles().each(($post, index) => {
                if ($post.text() == title) {
                    cy.wrap(index).as('indexPost');
                    return false;
                };
            });
        });
    };
    
    //This method clicks on "Load more" button to load more articles on the blog page. 
    clickLoadMoreButton() {
        this.elements.totalOfPosts().invoke('attr', 'data-posts-count').then((total) => {
            cy.log('The total number of blogs are: ' +total);
            this.elements.paginationResults().invoke('text').then((Showing) => {
                const ShowingResults = Showing.trim();
                const currentShowing = ShowingResults.substring(ShowingResults.indexOf('-') + 1, ShowingResults.indexOf('(') - 1);
                if (currentShowing !== total) {
                    cy.log('Clicking on Load More button');
                    this.elements.loadMoreBtn().should('be.visible').scrollIntoView().click();
                    cy.wait(2000);
                } else {
                    cy.log('There are not more posts to show, Showing 1-69 (69) results.');
                };
            });
        });
    };


    //This method clicks the "Load More" button until all the posts on the blog page are loaded.
    loadAllthePosts() {
        cy.log('Clicking in Load More button')
        this.elements.loadMoreBtn().should('be.visible').scrollIntoView().click();
        cy.wait(2000);
        this.elements.totalOfPosts().invoke('attr', 'data-posts-count').then((total) => {
            this.elements.paginationResults().invoke('text').then((Showing) => {
                cy.log('The current number of blogs displayed is: ' +Showing);
                const ShowingResults = Showing.trim();
                const currentShowing = ShowingResults.substring(ShowingResults.indexOf('-') + 1, ShowingResults.indexOf('(') - 1);
                if (currentShowing !== total) {
                    this.loadAllthePosts();
                } else {
                    cy.log('There are not more posts to show, Showing 1-69 (69) results.');
                };
            });
        });
    };

    
    //This method will print all the titles and links of each post.
    printAllPosts() {
        this.loadAllthePosts();
        this.elements.blogTitles().each(($post) => {   
            cy.wrap($post).find('a').invoke('attr', 'href').then((href) => {
                cy.log('**Post: '+ $post.text()+'**');
                cy.log('**Link: '+ href+'**');
            });        
        });
    };
};

module.exports = new BlogPage();