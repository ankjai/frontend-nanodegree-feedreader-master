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
            // feed is not undefined
            expect(allFeeds).toBeDefined();
            // feed array is not empty
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL defined', function() {
            allFeeds.forEach(function(element, index, array) {
                // feed url is nor undefined
                expect(element.url).toBeDefined();
                // url contains http
                expect(element.url).toMatch("http");
                // and url is not null
                expect(element.url).not.toBeNull();
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name defined', function() {
            allFeeds.forEach(function(element, index, array) {
                // feed name is not undefined
                expect(element.name).toBeDefined();
                // name is not null
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
            // error handling for undefined variables and out-of-bound array access
            try {
                // menu elem has class as an attr
                expect(menuElem[0].hasAttribute("class")).toBe(true);
                // and class attr has menu-hidden as value
                expect(menuElem[0].getAttribute("class")).toBe("menu-hidden");
            } catch (e) {
                console.error(e);
            }
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('is displayed when clicked', function() {
            var menuIconLinkElem = document.getElementsByClassName("menu-icon-link");

            // error handling for undefined variables and out-of-bound array access
            try {
                // click the menu icon
                menuIconLinkElem[0].click();

                var menuClickedElem = document.getElementsByTagName("body");
                // verify the class attr is present
                expect(menuClickedElem[0].hasAttribute("class")).toBe(true);
                // verify class attr is empty
                // this means menu is displayed
                expect(menuClickedElem[0].getAttribute("class")).toBe("");

                // click the menu icon
                menuIconLinkElem[0].click();

                menuClickedElem = document.getElementsByTagName("body");
                // verify the class attr is present
                expect(menuClickedElem[0].hasAttribute("class")).toBe(true);
                // verify class attr is .menu-hidden
                // this means menu is hidden
                expect(menuClickedElem[0].getAttribute("class")).toBe("menu-hidden");
            } catch (e) {
                console.error(e);
            }
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
            try {
                // verify .entry present in .feed container
                expect(feedElem[0].getElementsByClassName("entry").length).not.toEqual(0);
            } catch (e) {
                console.error(e);
            } finally {
                done();
            }
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
            try {
                var entries = feedElem[0].getElementsByClassName("entry");

                // cannot use forEach() as getElementsByClassName returns HTMLCollenction
                // object; which is not array but array-like object
                for (var i = 0; i < entries.length; i++) {
                    var header = entries[i].getElementsByTagName("h2")[0].innerHTML;
                    // verify header is not null
                    expect(header).not.toBeNull();
                    // push header into the array 
                    headerArray.push(header);
                };
            } catch (e) {
                console.error(e);
            } finally {
                done();
            }
        });

        it('the content changes', function(done) {
            var feedElem = document.getElementsByClassName("feed");
            try {
                var entries = feedElem[0].getElementsByClassName("entry");

                // cannot use forEach() as getElementsByClassName returns HTMLCollenction
                // object; which is not array but array-like object
                for (var i = 0; i < entries.length; i++) {
                    var header = entries[i].getElementsByTagName("h2")[0].innerHTML;
                    expect(header).not.toBeNull();

                    // check if header not present in headerArray
                    // as different feed was loaded by loadFeed()
                    expect(headerArray).not.toContain(header);
                };
            } catch (e) {
                console.error(e);
            } finally {
                done();
            }
        });
    })

}());
