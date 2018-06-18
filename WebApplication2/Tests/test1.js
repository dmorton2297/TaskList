import { Selector } from 'testcafe';
import { RequestMock, RequestLogger } from 'testcafe'



// Base URL for testing application 
const createUrl = 'http://localhost:65065/api/Data/Create';

// Logger 
const logger = RequestLogger(createUrl);

// HTTP Response Mocking
const mock = RequestMock()
    .onRequestTo('http://localhost:65065/api/Data/GetTasks')
    .respond([{ id: 0, name: 'test', description: 'test description', priority: 'H', completed: 'N', category: 4 }]);

// Fixture to define starting point any request hooks
// Each test script must have a fixture
fixture`TaskList Test Main`
    .page`http://localhost:65065/home`
    .requestHooks(logger);

// Navigation Test
// This test demonstrates simple UI Navigation with TestCafe
test
    .requestHooks(mock)
    ('Navigation Test 1', async t => { 
    await t
        .click('#tasklist-link')

        // assert what we are expecting 
        .expect(Selector('#tasklist-header').innerText).eql('Task List');
});

// Data loading test
// This test shows how request mocking can be used
test
    .requestHooks(mock)
    ('Tasklist Test 1', async t => {
        await t
            .navigateTo('http://localhost:65065/tasklist')
            .expect(Selector('#name_0').innerText).eql('test');
    });

// Test adding a task to the database 
// This test utilizes HTTP request logging
const categorySelect = Selector('#category');
const categoryOption = categorySelect.find('option');
test
    .requestHooks(mock)
    .requestHooks(logger)
    ('Add Task Test 1', async t => {
        await t
            .click('#tasklist-link')
            .click('#addTaskButton')
            .click('#name')
            .typeText('#name', 'add test 1')
            .click('#priority')
            .typeText('#priority', 'L')
            .click('#description')
            .typeText('#description', 'add test desc 1')
            .click(categorySelect)
            .click(categoryOption.withText('Family'))
            .click('#submitbutton')
            .expect(logger.contains(record => record.response.statusCode === 200)).ok();

    });