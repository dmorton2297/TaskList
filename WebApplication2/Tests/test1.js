import { Selector } from 'testcafe';
import { RequestMock, RequestLogger } from 'testcafe'


const logger = RequestLogger('http://localhost:65065/tasklist');
const mock = RequestMock()
    .onRequestTo('http://localhost:65065/api/Data/GetTasks')
    .respond([{ id: 0, name: 'test', description: 'test description', priority: 'H', completed: 'N', category: 4 }])
    .onRequestTo('http://localhost:65065/api/Data/GetTask/*')
    .respond({ id: 0, name: 'test', description: 'test description', priority: 'H', completed: 'N', category: 4 })


fixture`Getting Started`
    .page`http://localhost:65065/home`
    .requestHooks(logger);

// Navigation Test
test
    .requestHooks(mock)
    ('Navigation Test 1', async t => {
    await t
        .click('#tasklist-link')

        // assert what we are expecting 
        .expect(Selector('#tasklist-header').innerText).eql('Task List');
});

// Data loading test
test
    .requestHooks(mock)
    ('Tasklist Test 1', async t => {
        await t
            .navigateTo('http://localhost:65065/tasklist')
            .wait(100)
            .expect(Selector('#name_0').innerText).eql('test');
    });


// Test if details of selected task transfer to update view
test
    .requestHooks(mock)
    ('Update Task Test 1', async t => {
        await t
            .navigateTo('http://localhost:65065/updatetask/0')
            .wait(100)
            .expect(Selector('#name').value).eql('test');

    });


