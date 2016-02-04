/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL defined', function() {
            allFeeds.forEach(function(element, index, array) {
                expect(element.url).toBeDefined();
                expect(element.url).toMatch("http");
                expect(element.url).not.toBeNull();
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name defined', function() {
            allFeeds.forEach(function(element, index, array) {
                expect(element.name).toBeDefined();
                expect(element.name).not.toBeNull();
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            var menuElem = document.getElementsByTagName("body");
            expect(menuElem[0].hasAttribute("class")).toBe(true);
            expect(menuElem[0].getAttribute("class")).toBe("menu-hidden");
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('is displayed when clicked', function() {
            var menuIconLinkElem = document.getElementsByClassName("menu-icon-link");

            menuIconLinkElem[0].click();
            var menuClickedElem = document.getElementsByTagName("body");
            expect(menuClickedElem[0].hasAttribute("class")).toBe(true);
            expect(menuClickedElem[0].getAttribute("class")).toBe("");

            menuIconLinkElem[0].click();
            menuClickedElem = document.getElementsByTagName("body");
            expect(menuClickedElem[0].hasAttribute("class")).toBe(true);
            expect(menuClickedElem[0].getAttribute("class")).toBe("menu-hidden");
        });

    })



    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('a single .entry element within the .feed container', function(done) {
            var feedElem = document.getElementsByClassName("feed");
            if (feedElem.length > 0) {
                expect(feedElem[0].getElementsByClassName("entry").length).not.toEqual(0);
            } else {
                // fail test if no .feed element present
                expect(feedElem.length).not.toEqual(0);
            }
            done();
        });

        // afterEach not needed as loadFeed() empties out previous entries
        // afterEach();
    })



    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var idCounter = 1,
            headerArray = [];

        beforeEach(function(done) {
            loadFeed(idCounter, done);

            if (idCounter > 0) {
                idCounter--;
            };
        });

        it('the headers are not null', function(done) {
            var feedElem = document.getElementsByClassName("feed");

            if (feedElem.length > 0) {
                var entries = feedElem[0].getElementsByClassName("entry");

                // cannot use forEach() as getElementsByClassName returns HTMLCollenction
                // object; which is not array but array-like object
                for (var i = 0; i < entries.length; i++) {
                    var header = entries[i].getElementsByTagName("h2")[0].innerHTML;
                    expect(header).not.toBeNull();
                    headerArray.push(header);
                };
            } else {
                // fail test if no .feed element present
                expect(feedElem.length).not.toEqual(0);
            }

            done();
        });

        it('the content changes', function(done) {
            var feedElem = document.getElementsByClassName("feed");

            if (feedElem.length > 0) {
                var entries = feedElem[0].getElementsByClassName("entry");

                // cannot use forEach() as getElementsByClassName returns HTMLCollenction
                // object; which is not array but array-like object
                for (var i = 0; i < entries.length; i++) {
                    var header = entries[i].getElementsByTagName("h2")[0].innerHTML;
                    expect(header).not.toBeNull();

                    // check if header present in headerArray
                    expect(headerArray).not.toContain(header);
                };
            } else {
                // fail test if no .feed element present
                expect(feedElem.length).not.toEqual(0);
            }

            done();
        });
    })

}());
