import {addTasksAC, changeTasksAC, changeTitleTaskAC, removeTasksAC, tasksReducer} from './tasks-reducer';
import {AppTasksType} from '../../AppWithReducers';
import {addTodoListAC, removeTodolistAC} from './todolists-reducer';

test('correct task should be deleted from correct array', () => {
	const startState: AppTasksType = {
		"todolistId1": [
			{ taskId: "1", taskTitle: "CSS", taskIsDone: false },
			{ taskId: "2", taskTitle: "JS", taskIsDone: true },
			{ taskId: "3", taskTitle: "React", taskIsDone: false }
		],
		"todolistId2": [
			{ taskId: "1", taskTitle: "bread", taskIsDone: false },
			{ taskId: "2", taskTitle: "milk", taskIsDone: true },
			{ taskId: "3", taskTitle: "tea", taskIsDone: false }
		]
	};
	
	const action = removeTasksAC ("2", "todolistId2");
	
	const endState = tasksReducer (startState, action)
	
	expect(endState["todolistId1"].length).toBe(3);
	expect(endState["todolistId2"].length).toBe(2);
	expect(endState["todolistId2"].every(t => t.taskId != "2")).toBeTruthy();
});


test('correct task should be added to correct array', () => {
	const startState: AppTasksType = {
		"todolistId1": [
			{ taskId: "1", taskTitle: "CSS", taskIsDone: false },
			{ taskId: "2", taskTitle: "JS", taskIsDone: true },
			{ taskId: "3", taskTitle: "React", taskIsDone: false }
		],
		"todolistId2": [
			{ taskId: "1", taskTitle: "bread", taskIsDone: false },
			{ taskId: "2", taskTitle: "milk", taskIsDone: true },
			{ taskId: "3", taskTitle: "tea", taskIsDone: false }
		]
	};
	
	const action = addTasksAC ('juce', 'todolistId2');
	
	const endState = tasksReducer (startState, action)
	
	expect(endState["todolistId1"].length).toBe(3);
	expect(endState["todolistId2"].length).toBe(4);
	expect(endState["todolistId2"][0].taskId).toBeDefined();
	expect(endState["todolistId2"][0].taskTitle).toBe("bread");
	expect(endState["todolistId2"][0].taskIsDone).toBe(false);
})



test('status of specified task should be changed', () => {
	const startState: AppTasksType = {
		"todolistId1": [
			{ taskId: "1", taskTitle: "CSS", taskIsDone: false },
			{ taskId: "2", taskTitle: "JS", taskIsDone: true },
			{ taskId: "3", taskTitle: "React", taskIsDone: false }
		],
		"todolistId2": [
			{ taskId: "1", taskTitle: "bread", taskIsDone: false },
			{ taskId: "2", taskTitle: "milk", taskIsDone: true },
			{ taskId: "3", taskTitle: "tea", taskIsDone: false }
		]
	};
	
	const action = changeTasksAC ("2", false, "todolistId2");
	
	const endState = tasksReducer (startState, action)
	
	expect(endState["todolistId2"][1].taskId).toBeDefined();
	expect(endState["todolistId2"][1].taskIsDone).toBe(false);
});


test('status of specified task should be changed', () => {
	const startState: AppTasksType = {
		"todolistId1": [
			{ taskId: "1", taskTitle: "CSS", taskIsDone: false },
			{ taskId: "2", taskTitle: "JS", taskIsDone: true },
			{ taskId: "3", taskTitle: "React", taskIsDone: false }
		],
		"todolistId2": [
			{ taskId: "1", taskTitle: "bread", taskIsDone: false },
			{ taskId: "2", taskTitle: "newTitleTask", taskIsDone: true },
			{ taskId: "3", taskTitle: "tea", taskIsDone: false }
		]
	};
	
	const action = changeTitleTaskAC ("2", 'newTitleTask', "todolistId2");
	
	const endState = tasksReducer(startState, action)
	
	expect(endState["todolistId2"][1].taskId).toBeDefined();
	expect(endState["todolistId2"][1].taskTitle).toBe("newTitleTask");
	expect(endState["todolistId2"][1].taskIsDone).toBe(true);
});


test('new array should be added when new todolist is added', () => {
	
	const startState: AppTasksType = {
		
		"todolistId1": [
			{ taskId: "1", taskTitle: "CSS", taskIsDone: false },
			{ taskId: "2", taskTitle: "JS", taskIsDone: true },
			{ taskId: "3", taskTitle: "React", taskIsDone: false }
		],
		"todolistId2": [
			{ taskId: "1", taskTitle: "bread", taskIsDone: false },
			{ taskId: "2", taskTitle: "milk", taskIsDone: true },
			{ taskId: "3", taskTitle: "tea", taskIsDone: false }
		]
	};
	
	
	const action = addTodoListAC ('new todolist')
	const endState = tasksReducer (startState, action)
	
	
	const keys = Object.keys(endState);
	const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
	if (!newKey) {
		throw Error("new key should be added")
	}
	
	expect(keys.length).toBe(3);
	expect(endState[newKey]).toStrictEqual([]);
});



test('property with todolistId should be deleted', () => {
	const startState: AppTasksType = {
		"todolistId1": [
			{ taskId: "1", taskTitle: "CSS", taskIsDone: false },
			{ taskId: "2", taskTitle: "JS", taskIsDone: true },
			{ taskId: "3", taskTitle: "React", taskIsDone: false }
		],
		"todolistId2": [
			{ taskId: "1", taskTitle: "bread", taskIsDone: false },
			{ taskId: "2", taskTitle: "milk", taskIsDone: true },
			{ taskId: "3", taskTitle: "tea", taskIsDone: false }
		]
	};
	
	const action = removeTodolistAC ("todolistId2");
	
	const endState = tasksReducer (startState, action)
	
	
	const keys = Object.keys(endState);
	
	expect(keys.length).toBe(1);
	expect(endState["todolistId2"]).not.toBeDefined();
});
