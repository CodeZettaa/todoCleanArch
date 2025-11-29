# Angular Clean Architecture - Todo App

A Todo application built with Angular 19+ demonstrating **Clean Architecture** principles in a frontend context. This project serves as a portfolio example showcasing architectural thinking and best practices in Angular development.

## 🎯 Project Goals

This project focuses on:
- **Clean, well-structured codebase** over complex UI
- **Separation of concerns** through layered architecture
- **Testability** and **maintainability**
- **Dependency Inversion** - domain layer is independent of framework and infrastructure
- **Clear architectural boundaries** that make the codebase easy to understand and explain

## 🛠 Tech Stack

- **Angular 19+** - Latest Angular with standalone components (no NgModules)
- **TypeScript** - Strong typing throughout
- **RxJS** - Reactive programming for async operations
- **Angular Signals** - Modern reactive state management
- **Angular Router** - Lazy loading and routing
- **ESLint** - Code quality and consistency

## 📁 Folder Structure & Architecture

The project follows a **layered, feature-based architecture**:

```
src/app/
├── core/                    # Cross-cutting concerns
│   └── utils/              # Error handling, utilities
│
├── domain/                 # Business logic layer (framework-agnostic)
│   ├── entities/           # Domain models (Todo)
│   ├── repositories/       # Repository interfaces (abstractions)
│   └── use-cases/          # Business use cases
│       ├── load-todos.use-case.ts
│       ├── create-todo.use-case.ts
│       ├── toggle-todo.use-case.ts
│       ├── update-todo.use-case.ts
│       └── delete-todo.use-case.ts
│
├── infrastructure/         # Implementation layer
│   ├── repositories/       # Concrete repository implementations
│   │   └── todo-api.service.ts  # In-memory data store
│   └── providers/          # Dependency injection providers
│       └── todo-repository.provider.ts
│
├── features/               # Feature modules
│   └── todos/
│       ├── components/     # Presentational components
│       │   ├── todo-item/
│       │   ├── todo-list/
│       │   ├── todo-form/
│       │   └── todo-filters/
│       ├── pages/          # Container components
│       │   └── todos.page.ts
│       └── services/       # Feature state management
│           └── todos-state.service.ts
│
└── shared/                 # Reusable UI components
    └── components/
        ├── button/
        ├── input/
        └── loading-spinner/
```

## 🏗 Architecture Layers Explained

### 1. **Domain Layer** (`src/app/domain/`)

The **core business logic** layer. This layer is:
- **Framework-agnostic** - No Angular-specific code
- **UI-agnostic** - No knowledge of how data is displayed
- **Infrastructure-agnostic** - Depends on abstractions, not implementations

**Components:**
- **Entities**: Domain models (e.g., `Todo` interface)
- **Repository Interfaces**: Contracts for data operations (e.g., `TodoRepository`)
- **Use Cases**: Business logic operations (e.g., `CreateTodoUseCase`, `ToggleTodoUseCase`)

**Key Principle**: The domain layer defines **what** needs to be done, not **how** it's done.

### 2. **Infrastructure Layer** (`src/app/infrastructure/`)

Implements the domain's abstractions. This layer:
- Provides concrete implementations of repository interfaces
- Handles data persistence (in-memory store, API calls, etc.)
- Maps between API models and domain models if needed

**Components:**
- **TodoApiService**: Implements `TodoRepository` interface
- **Providers**: Wires up dependency injection (connects abstractions to implementations)

**In this project**: Uses an in-memory store with simulated network delay. In production, this would use `HttpClient` to call a real API.

### 3. **Core Layer** (`src/app/core/`)

Cross-cutting concerns that are used across the application:
- Error handling utilities
- Logging
- HTTP interceptors (if needed)
- Configuration services

### 4. **Features Layer** (`src/app/features/`)

Feature-specific code organized by feature:
- **Components**: UI components (presentational and container)
- **Services**: Feature-specific state management
- **Pages**: Container components that orchestrate the feature

**State Management**: Uses Angular Signals for reactive state management in `TodosStateService`.

### 5. **Shared Layer** (`src/app/shared/`)

Reusable UI components, directives, and pipes that can be used across features:
- Button component
- Input component
- Loading spinner

## 🔄 Data Flow: How Todo Operations Work

Here's how a typical operation (e.g., creating a todo) flows through the layers:

```
1. User Interaction (UI)
   ↓
2. Container Component (TodosPageComponent)
   - Receives user input
   - Calls state service
   ↓
3. State Service (TodosStateService)
   - Manages local state (signals)
   - Orchestrates use cases
   ↓
4. Use Case (CreateTodoUseCase)
   - Contains business rules (validation)
   - Depends on repository interface (abstraction)
   ↓
5. Repository Implementation (TodoApiService)
   - Implements the repository interface
   - Performs actual data operation (in-memory store)
   ↓
6. Response flows back up
   - Repository → Use Case → State Service → Component → UI
```

### Example: Creating a Todo

```typescript
// 1. User fills form and clicks "Add Todo"
// 2. TodoFormComponent emits onSubmitTodo event

// 3. TodosPageComponent.onCreateTodo()
onCreateTodo(dto: CreateTodoDto): void {
  this.stateService.createTodo(dto).subscribe({
    next: () => this.showForm.set(false)
  });
}

// 4. TodosStateService.createTodo()
createTodo(dto: CreateTodoDto): Observable<Todo> {
  return this.createTodoUseCase.execute(dto).pipe(
    tap({
      next: (todo) => {
        this.todosSignal.update(todos => [...todos, todo]);
      }
    })
  );
}

// 5. CreateTodoUseCase.execute()
execute(dto: CreateTodoDto): Observable<Todo> {
  // Business rule: title is required
  if (!dto.title || dto.title.trim().length === 0) {
    throw new Error('Todo title is required');
  }
  return this.repository.create(dto);
}

// 6. TodoApiService.create() (implements TodoRepository)
create(dto: CreateTodoDto): Observable<Todo> {
  const newTodo: Todo = {
    id: this.generateId(),
    title: dto.title,
    description: dto.description,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  this.todos.push(newTodo);
  return of(newTodo).pipe(delay(300));
}
```

## 🎨 Component Architecture

### Container/Presentational Pattern

- **Container Components** (e.g., `TodosPageComponent`):
  - Manage state and business logic
  - Fetch data via use cases/state services
  - Pass data to presentational components via `@Input()`
  - Handle events from presentational components via `@Output()`

- **Presentational Components** (e.g., `TodoItemComponent`, `TodoFormComponent`):
  - Receive data via `@Input()`
  - Emit events via `@Output()`
  - No direct knowledge of state management or use cases
  - Highly reusable and testable

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 19+

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

3. **Open your browser:**
   Navigate to `http://localhost:4200`

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint

## 📝 Features

- ✅ List all todos
- ✅ Create a new todo
- ✅ Toggle todo completion status
- ✅ Update todo (title/description)
- ✅ Delete a todo
- ✅ Filter todos: All / Active / Completed
- ✅ Real-time statistics (total, active, completed)

## 🧪 Testing Strategy

While tests are not included in this initial version, the architecture supports easy testing:

- **Use Cases**: Can be tested in isolation with mock repositories
- **Components**: Presentational components are easy to test (inputs/outputs)
- **State Services**: Can be tested with mock use cases
- **Repository**: Can be tested independently

## 🔑 Key Architectural Decisions

### 1. **Dependency Inversion Principle**

The domain layer depends on abstractions (interfaces), not concrete implementations. This allows:
- Easy swapping of implementations (e.g., in-memory → API → GraphQL)
- Better testability
- Clear separation of concerns

### 2. **Use Cases as Services**

Use cases are implemented as Angular services, making them:
- Injectable and testable
- Easy to use in components and state services
- Following Angular's dependency injection patterns

### 3. **Angular Signals for State**

Using Angular Signals provides:
- Fine-grained reactivity
- Better performance
- Simpler state management than RxJS BehaviorSubjects for this use case

### 4. **Standalone Components**

All components are standalone (no NgModules), which:
- Reduces boilerplate
- Makes components more portable
- Aligns with Angular's modern approach

### 5. **Path Aliases**

Using TypeScript path aliases (`@domain`, `@infrastructure`, etc.):
- Makes imports cleaner
- Clearly shows architectural boundaries
- Easier refactoring

## 📚 Learning Resources

This project demonstrates:
- Clean Architecture principles in Angular
- Dependency Injection patterns
- State management with Angular Signals
- Container/Presentational component pattern
- Repository pattern
- Use Case pattern

## 🤝 Contributing

This is a portfolio/example project. Feel free to use it as a reference or starting point for your own projects.

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ to demonstrate Clean Architecture in Angular**
