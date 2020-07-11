import {addTasksAT, changeTasksAT, changeTitleTaskAT, removeTasksAT, tasksReducer} from './tasks-reducer';
import {AppTasksHookType} from '../App';
import {addTodoListAT, removeTodolistAT} from './todolists-reducer';

test('correct task should be deleted from correct array', () => {
	const startState: AppTasksHookType = {
		"todolistId1": [
			{ tasksId: "1", tasksTitle: "CSS", tasksIsDone: false },
			{ tasksId: "2", tasksTitle: "JS", tasksIsDone: true },
			{ tasksId: "3", tasksTitle: "React", tasksIsDone: false }
		],
		"todolistId2": [
			{ tasksId: "1", tasksTitle: "bread", tasksIsDone: false },
			{ tasksId: "2", tasksTitle: "milk", tasksIsDone: true },
			{ tasksId: "3", tasksTitle: "tea", tasksIsDone: false }
		]
	};
	
	const action = removeTasksAT("2", "todolistId2");
	
	const endState = tasksReducer(startState, action)
	
	expect(endState["todolistId1"].length).toBe(3);
	expect(endState["todolistId2"].length).toBe(2);
	expect(endState["todolistId2"].every(t => t.tasksId != "2")).toBeTruthy();
});


test('correct task should be added to correct array', () => {
	const startState: AppTasksHookType = {
		"todolistId1": [
			{ tasksId: "1", tasksTitle: "CSS", tasksIsDone: false },
			{ tasksId: "2", tasksTitle: "JS", tasksIsDone: true },
			{ tasksId: "3", tasksTitle: "React", tasksIsDone: false }
		],
		"todolistId2": [
			{ tasksId: "1", tasksTitle: "bread", tasksIsDone: false },
			{ tasksId: "2", tasksTitle: "milk", tasksIsDone: true },
			{ tasksId: "3", tasksTitle: "tea", tasksIsDone: false }
		]
	};
	
	const action = addTasksAT ('v1()', "juce", "todolistId2");
	
	const endState = tasksReducer(startState, action)
	
	expect(endState["todolistId1"].length).toBe(3);
	expect(endState["todolistId2"].length).toBe(4);
	expect(endState["todolistId2"][0].tasksId).toBeDefined();
	expect(endState["todolistId2"][0].tasksTitle).toBe("bread");
	expect(endState["todolistId2"][0].tasksIsDone).toBe(false);
})



test('status of specified task should be changed', () => {
	const startState: AppTasksHookType = {
		"todolistId1": [
			{ tasksId: "1", tasksTitle: "CSS", tasksIsDone: false },
			{ tasksId: "2", tasksTitle: "JS", tasksIsDone: true },
			{ tasksId: "3", tasksTitle: "React", tasksIsDone: false }
		],
		"todolistId2": [
			{ tasksId: "1", tasksTitle: "bread", tasksIsDone: false },
			{ tasksId: "2", tasksTitle: "milk", tasksIsDone: true },
			{ tasksId: "3", tasksTitle: "tea", tasksIsDone: false }
		]
	};
	
	const action = changeTasksAT("2", false, "todolistId2", '');
	
	const endState = tasksReducer(startState, action)
	
	expect(endState["todolistId2"][1].tasksId).toBeDefined();
	expect(endState["todolistId2"][1].tasksIsDone).toBe(false);
});


test('status of specified task should be changed', () => {
	const startState: AppTasksHookType = {
		"todolistId1": [
			{ tasksId: "1", tasksTitle: "CSS", tasksIsDone: false },
			{ tasksId: "2", tasksTitle: "JS", tasksIsDone: true },
			{ tasksId: "3", tasksTitle: "React", tasksIsDone: false }
		],
		"todolistId2": [
			{ tasksId: "1", tasksTitle: "bread", tasksIsDone: false },
			{ tasksId: "2", tasksTitle: "newTitleTask", tasksIsDone: true },
			{ tasksId: "3", tasksTitle: "tea", tasksIsDone: false }
		]
	};
	
	const action = changeTitleTaskAT("2", 'newTitleTask', "todolistId2");
	
	const endState = tasksReducer(startState, action)
	
	expect(endState["todolistId2"][1].tasksId).toBeDefined();
	expect(endState["todolistId2"][1].tasksTitle).toBe("newTitleTask");
	expect(endState["todolistId2"][1].tasksIsDone).toBe(true);
});


test('new array should be added when new todolist is added', () => {
	
	const startState: AppTasksHookType = {
		
		"todolistId1": [
			{ tasksId: "1", tasksTitle: "CSS", tasksIsDone: false },
			{ tasksId: "2", tasksTitle: "JS", tasksIsDone: true },
			{ tasksId: "3", tasksTitle: "React", tasksIsDone: false }
		],
		"todolistId2": [
			{ tasksId: "1", tasksTitle: "bread", tasksIsDone: false },
			{ tasksId: "2", tasksTitle: "milk", tasksIsDone: true },
			{ tasksId: "3", tasksTitle: "tea", tasksIsDone: false }
		]
	};
	
	
	const action = addTodoListAT('new todolist')
	const endState = tasksReducer(startState, action)
	
	
	const keys = Object.keys(endState);
	const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
	if (!newKey) {
		throw Error("new key should be added")
	}
	
	expect(keys.length).toBe(3);
	expect(endState[newKey]).toStrictEqual([]);
});



test('property with todolistId should be deleted', () => {
	const startState: AppTasksHookType = {
		"todolistId1": [
			{ tasksId: "1", tasksTitle: "CSS", tasksIsDone: false },
			{ tasksId: "2", tasksTitle: "JS", tasksIsDone: true },
			{ tasksId: "3", tasksTitle: "React", tasksIsDone: false }
		],
		"todolistId2": [
			{ tasksId: "1", tasksTitle: "bread", tasksIsDone: false },
			{ tasksId: "2", tasksTitle: "milk", tasksIsDone: true },
			{ tasksId: "3", tasksTitle: "tea", tasksIsDone: false }
		]
	};
	
	const action = removeTodolistAT("todolistId2");
	
	const endState = tasksReducer(startState, action)
	
	
	const keys = Object.keys(endState);
	
	expect(keys.length).toBe(1);
	expect(endState["todolistId2"]).not.toBeDefined();
});
