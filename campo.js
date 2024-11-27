
document.addEventListener('DOMContentLoaded',
    () => {
    
    
        const grid =
    document.getElementById('minesweeper');
    
    
        const width = 10;
    
    
        const height = 10;
    
    
        const bombs = 20;
    
    
        const cells = [];
    
    
     
    
        // Crie a grade
    
    
        for (let y = 0; y < height; y++) {
    
    
            for (let x = 0; x < width; x++) {
    
    
                const cell =
    document.createElement('div');
    
    
                cell.classList.add('cell');
    
    
                cell.dataset.x = x;
    
    
                cell.dataset.y = y;
    
    
                grid.appendChild(cell);
    
    
                cells.push(cell);
    
    
            }
    
    
        }
    
    
     
    
        // Coloque bombas
    
    
        for (let i = 0; i < bombs; i++) {
    
    
            let index;
    
    
            do {
    
    
                index = Math.floor(Math.random() *
    cells.length);
    
    
            } while
    (cells[index].classList.contains('bomb'));
    
    
            cells[index].classList.add('bomb');
    
    
        }
    
    
     
    
        // Adicionar ouvintes de eventos
    
    
       
    cells.forEach(cell => {
    
    
            cell.addEventListener('click',
    () => {
    
    
                if
    (cell.classList.contains('bomb')) {
    
    
                    cell.classList.add('revealed');
    
    
                    alert('Game Over!');
    
    
                } else {
    
    
                    cell.classList.add('revealed');
    
    
                    // Add logic to reveal adjacent
    cells and count bombs
    
    
                }
    
    
            });
    
    
        });
    
    
    });
    
    document.addEventListener('DOMContentLoaded',
        () => {
        
        
            const grid =
        document.getElementById('minesweeper');
        
        
            const width = 10;
        
        
            const height = 10;
        
        
            const bombs = 20;
        
        
            const cells = [];
        
        
         
        
            // Crie a grade
        
        
         
        
        
            for (let y = 0; y < height; y++) {
        
        
                for (let x = 0; x < width; x++) {
        
        
                    const cell =
        document.createElement('div');
        
        
                    cell.classList.add('cell');
        
        
                    cell.dataset.x = x;
        
        
                    cell.dataset.y = y;
        
        
                    grid.appendChild(cell);
        
        
                    cells.push(cell);
        
        
                }
        
        
            }
        
        
         
        
            // Coloque bombas
        
        
         
        
        
            for (let i = 0; i < bombs; i++) {
        
        
                let index;
        
        
                do {
        
        
                    index = Math.floor(Math.random() *
        cells.length);
        
        
                } while
        (cells[index].classList.contains('bomb'));
        
        
                cells[index].classList.add('bomb');
        
        
            }
        
        
         
        
            // Adicionar ouvintes de eventos
        
        
         
        
        
           
        cells.forEach(cell => {
        
        
                cell.addEventListener('click',
        () => {
        
        
                    if
        (cell.classList.contains('bomb')) {
        
        
                        cell.classList.add('revealed');
        
        
                        alert('Game Over!');
        
        
                    } else {
        
        
                        revealCell(cell);
        
        
                    }
        
        
                });
        
        
            });
        
        
         
        
        
            function revealCell(cell) {
        
        
                if
        (cell.classList.contains('revealed')) return;
        
        
                cell.classList.add('revealed');
        
        
                const x = parseInt(cell.dataset.x);
        
        
                const y = parseInt(cell.dataset.y);
        
        
                const adjacentCells = getAdjacentCells(x,
        y);
        
        
                const bombsCount =
        adjacentCells.filter(c => c.classList.contains('bomb')).length;
        
        
                if (bombsCount > 0) {
        
        
                    cell.textContent = bombsCount;
        
        
                } else {
        
        
                    adjacentCells.forEach(revealCell);
        
        
                }
        
        
            }
        
        
         
        
        
            function getAdjacentCells(x, y) {
        
        
                const adjacent = [];
        
        
                for (let dx = -1; dx <= 1; dx++) {
        
        
                    for (let dy = -1; dy <= 1; dy++)
        {
        
        
                        if (dx === 0 && dy ===
        0) continue;
        
        
                        const nx = x + dx;
        
        
                        const ny = y + dy;
        
        
                        if (nx >= 0 && nx
        < width && ny >= 0 && ny < height) {
        
        
                            const adjacentCell =
        cells.find(c => c.dataset.x == nx && c.dataset.y == ny);
        
        
                            if (adjacentCell)
        adjacent.push(adjacentCell);
        
        
                        }
        
        
                    }
        
        
                }
        
        
               
        return adjacent;
        
        
            }
        
        
        });
        
        
    
    