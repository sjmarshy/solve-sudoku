# Idea

so I'd like to be able to programatically solve sudoku puzzles, and ideally I'd
like to solve this problem for myself. I'm half decent at sudoku so I'm hoping I
have half a chance at managing it.

## Strategies

So, we're going to have to implement a representation of the board, that's fine
and dandy and easy. We can implement moves, we can implement a record of those
moves. This will allow us to play back how the board was solved. Again, fine and
dandy. The more important, and tricky, part of this is the strategy for solving
the puzzle. There's going to be a lot of ways of potentially doing this, so it
might behoove me to crack on with the ideas.

one of the things we're going to take advantage of is `low hanging fruit`. This
is common with most sudoku boards.

We should be able to use the same techniques a human does.

We can automatically use the 'notes' technique very quickly - essentially you
compute the potential places each number could possibly be. When the computed
figure is the only one in it's row, or column, or ninth (any of these) we can
simply agree that it's definitely going to be there, and recompute.

## Steps

so how do we implement this?

1. build a representation of the board.
	i. build a representation of a single cell. This should contain a
	`definite` cell which can hold a single digit (1...9) and a `possible`
	area with a hash-map containing 1..9 as keys, each with 'true' or
	'false'
	ii. build a representation of the board as a whole. Rather than
	splitting it into groups based on ninths, it will be a whole. ninths
	will be cached info held within the game object, as implementing them
	directly would make querying columns and rows harder. Info held in the
	ninth, column and row sections will make computing notes quicker (if a
	row contains numbes 1, 3 and 8 they don't need to be checked).
2. build a way to display the board.
3. fill in the *notes* for each number.
4. hunt for notes which suggest a number has a definite position and apply.
